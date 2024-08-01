package com.example.polusServiceRequest.services;

import com.example.polusServiceRequest.DTOs.RoleDTO;
import com.example.polusServiceRequest.DTOs.SignInResponseDTO;
import com.example.polusServiceRequest.DTOs.SignUpDTO;
import com.example.polusServiceRequest.constants.RoleNamesConstants;
import com.example.polusServiceRequest.models.CountryEntity;
import com.example.polusServiceRequest.models.PersonEntity;
import com.example.polusServiceRequest.models.PersonRoleEntity;
import com.example.polusServiceRequest.models.RoleEntity;
import com.example.polusServiceRequest.repositories.PersonRepository;
import com.example.polusServiceRequest.repositories.RoleRepository;
import com.example.polusServiceRequest.repositories.PersonRoleRepository;
import com.example.polusServiceRequest.repositories.CountryRepository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LoginServiceImpl implements LoginService {

	private Logger logger = LogManager.getLogger(SRTicketServiceImpl.class);

	@Autowired
	private PersonRepository personRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PersonRoleRepository personRoleRepository;

	@Autowired
	private CountryRepository countryRepository;

	@Override
	public SignInResponseDTO signIn(String username, String password) {
		try {
			PersonEntity person = personRepository.findByUserNameAndPassword(username, password);
			if (person != null) {
				SignInResponseDTO responseDTO = new SignInResponseDTO();
				responseDTO.setPersonId(person.getPersonId());
				responseDTO.setFirstName(person.getFirstName());
				responseDTO.setLastName(person.getLastName());
				responseDTO.setUserName(person.getUserName());
				responseDTO.setEmail(person.getEmail());
				responseDTO.setCountry(person.getCountry());
				responseDTO.setPhoneNumber(person.getPhoneNumber());
				responseDTO.setAddress(person.getAddress());
				responseDTO.setCreatedDate(person.getCreateTimestamp());
				responseDTO.setUpdatedDate(person.getUpdateTimestamp());
				List<RoleDTO> roleDTOs = new ArrayList<>();
				for (PersonRoleEntity personRole : person.getRoles()) {
					RoleDTO roleDTO = new RoleDTO();
					roleDTO.setRoleId(personRole.getRole().getRoleId());
					roleDTO.setRoleName(personRole.getRole().getRoleName());
					roleDTO.setRoleDescription(personRole.getRole().getRoleDescription());
					roleDTOs.add(roleDTO);
				}
				responseDTO.setRoles(roleDTOs);
				return responseDTO;
			} else {
				throw new RuntimeException("Authentication failed");
			}
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new RuntimeException("Error during sign-in: " + e.getMessage(), e);
		}
	}

	@Override
	public boolean signUp(SignUpDTO signUpDTO) {
		try {
			// Check if the username already exists
			if (personRepository.findByUserName(signUpDTO.getUserName()) != null) {
				throw new RuntimeException("Username already exists");
			}
			PersonEntity newPerson = new PersonEntity();
			Optional<CountryEntity> country = countryRepository.findById(signUpDTO.getCountry());
			newPerson.setFirstName(signUpDTO.getFirstName());
			newPerson.setLastName(signUpDTO.getLastName());
			newPerson.setFullName(signUpDTO.getFirstName() + " " + signUpDTO.getLastName());
			newPerson.setUserName(signUpDTO.getUserName());
			newPerson.setPassword(signUpDTO.getPassword());
			newPerson.setEmail(signUpDTO.getEmail());
			newPerson.setCountry(country.get());
			newPerson.setPhoneNumber(signUpDTO.getPhoneNo());
			newPerson.setAddress(signUpDTO.getAddress());
			newPerson.setCreateTimestamp(Timestamp.from(Instant.now()));
			newPerson.setUpdateTimestamp(Timestamp.from(Instant.now()));
			newPerson.setStatus("Active");
			newPerson.setDesignation(signUpDTO.getDesignation());
			PersonEntity savedPerson = personRepository.save(newPerson);
			RoleEntity role = roleRepository.findByRoleName(RoleNamesConstants.DEFAULT_ROLE);
			if (role == null) {
				throw new RuntimeException("Role not found");
			}
			PersonRoleEntity personRole = new PersonRoleEntity();
			personRole.setPerson(savedPerson);
			personRole.setRole(role);
			personRole.setUpdateUser(savedPerson);
			personRole.setUpdateTimestamp(Timestamp.from(Instant.now()));
			personRoleRepository.save(personRole);
			return true;
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new RuntimeException("Error during sign-up: " + e.getMessage(), e);
		}
	}

	@Override
	public List<CountryEntity> getAllCountries() {
		try {
			return countryRepository.findAll();
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new RuntimeException(e.getMessage());
		}

	}

	@Override
	public SignInResponseDTO editUserDetails(SignUpDTO userDetails) {

		try {
			PersonEntity person = personRepository.findById(userDetails.getPersonId())
					.orElseThrow(() -> new RuntimeException("Ticket not found"));
			person.setFirstName(userDetails.getFirstName());
			person.setLastName(userDetails.getLastName());
			person.setFullName(userDetails.getFirstName() + " " + userDetails.getLastName());
			if (!userDetails.getUserName().equals(person.getUserName())) {
				// Check if the username already exists
				if (personRepository.findByUserName(userDetails.getUserName()) != null) {
					throw new RuntimeException("Username already exists");
				}
			}
			person.setUserName(userDetails.getUserName());
			person.setEmail(userDetails.getEmail());
			person.setPhoneNumber(userDetails.getPhoneNo());
			person.setAddress(userDetails.getAddress());
			person.setUpdateTimestamp(Timestamp.from(Instant.now()));
			CountryEntity country = countryRepository.findById(userDetails.getCountry())
					.orElseThrow(() -> new RuntimeException("Country not found"));
			person.setCountry(country);
			person.setDesignation(userDetails.getDesignation());
			PersonEntity savedPerson = personRepository.save(person);
			return getUserDetails(savedPerson);
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
	}

	private SignInResponseDTO getUserDetails(PersonEntity person) {

		SignInResponseDTO responseDTO = new SignInResponseDTO();
		responseDTO.setPersonId(person.getPersonId());
		responseDTO.setFirstName(person.getFirstName());
		responseDTO.setLastName(person.getLastName());
		responseDTO.setUserName(person.getUserName());
		responseDTO.setEmail(person.getEmail());
		responseDTO.setCountry(person.getCountry());
		responseDTO.setPhoneNumber(person.getPhoneNumber());
		responseDTO.setAddress(person.getAddress());
		responseDTO.setCreatedDate(person.getCreateTimestamp());
		responseDTO.setUpdatedDate(person.getUpdateTimestamp());
		List<RoleDTO> roleDTOs = new ArrayList<>();
		for (PersonRoleEntity personRole : person.getRoles()) {
			RoleDTO roleDTO = new RoleDTO();
			roleDTO.setRoleId(personRole.getRole().getRoleId());
			roleDTO.setRoleName(personRole.getRole().getRoleName());
			roleDTO.setRoleDescription(personRole.getRole().getRoleDescription());
			roleDTOs.add(roleDTO);
		}
		responseDTO.setRoles(roleDTOs);
		return responseDTO;
	}

}
