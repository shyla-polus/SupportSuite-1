package com.example.polusServiceRequest.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.polusServiceRequest.DTOs.CommentDetailsDTO;
import com.example.polusServiceRequest.DTOs.MakeOrRemoveAdminDTO;
import com.example.polusServiceRequest.DTOs.NewServiceCategoryDTO;
import com.example.polusServiceRequest.DTOs.ServiceTicketsDetailsDTO;
import com.example.polusServiceRequest.DTOs.TicketApproveOrRejectDTO;
import com.example.polusServiceRequest.DTOs.TicketResponseDTO;
import com.example.polusServiceRequest.constants.RoleNamesConstants;
import com.example.polusServiceRequest.constants.SRTicketStatusConstants;
import com.example.polusServiceRequest.models.PersonEntity;
import com.example.polusServiceRequest.models.PersonRoleEntity;
import com.example.polusServiceRequest.models.RoleEntity;
import com.example.polusServiceRequest.models.SRTicketCategoryEntity;
import com.example.polusServiceRequest.models.SRTicketCommentsEntity;
import com.example.polusServiceRequest.models.SRTicketStatusEntity;
import com.example.polusServiceRequest.models.SRTicketsEntity;
import com.example.polusServiceRequest.repositories.PersonRepository;
import com.example.polusServiceRequest.repositories.PersonRoleRepository;
import com.example.polusServiceRequest.repositories.RoleRepository;
import com.example.polusServiceRequest.repositories.SRTicketCategoryRepository;
import com.example.polusServiceRequest.repositories.SRTicketCommentsRepository;
import com.example.polusServiceRequest.repositories.SRTicketHistoryRepository;
import com.example.polusServiceRequest.repositories.SRTicketStatusRepository;
import com.example.polusServiceRequest.repositories.SRTicketsRepository;

@Service
public class AdminServiceImpl implements AdminService {

	private Logger logger = LogManager.getLogger(SRTicketServiceImpl.class);

	@Autowired
	private SRTicketsRepository ticketsRepository;

	@Autowired
	private SRTicketHistoryRepository historyRepository;

	@Autowired
	private PersonRepository personRepository;

	@Autowired
	private SRTicketStatusRepository statusRepository;

	@Autowired
	private SRTicketCategoryRepository categoryRepository;

	@Autowired
	private SRTicketCommentsRepository commentRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PersonRoleRepository personRoleRepository;

	@Override
	public Boolean approveOrRejectTicket(TicketApproveOrRejectDTO ticketDTO) {

		try {
			SRTicketsEntity ticket = ticketsRepository.findById(ticketDTO.getTicketId())
					.orElseThrow(() -> new RuntimeException("Ticket not found"));
			SRTicketStatusEntity status = statusRepository.findById(ticketDTO.getStatusCode())
					.orElseThrow(() -> new RuntimeException("Status not found"));
			ticket.setStatus(status);
			ticket.setUpdateTimestamp(Timestamp.from(Instant.now()));
			ticket = ticketsRepository.save(ticket);
			ServiceRequestUtil.setHistoryDetails(ticket, historyRepository);
			if (ticketDTO.getComment() != null && !ticketDTO.getComment().isEmpty()) {
				SRTicketCommentsEntity comment = new SRTicketCommentsEntity();
				comment.setSrTicket(ticket);
				comment.setComment(ticketDTO.getComment());
				comment.setCommentUser(ticket.getAssignedTo());
				comment.setCommentTimestamp(Timestamp.from(Instant.now()));
				comment.setStatusCode(ticket.getStatus());
				commentRepository.save(comment);
			}
			return true;
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
	}

	@Override
	public Boolean CreateNewServiceCategory(NewServiceCategoryDTO categoryDTO) {
		try {
			PersonEntity admin = personRepository.findById(categoryDTO.getAdminId())
					.orElseThrow(() -> new RuntimeException("Admin not found"));
			SRTicketCategoryEntity category = new SRTicketCategoryEntity();
			category.setCategoryName(categoryDTO.getCategoryName());
			category.setDescription(categoryDTO.getDescription());
			category.setUpdateUser(admin);
			category.setUpdateTimestamp(Timestamp.from(Instant.now()));
			category.setIsActive("yes");
			categoryRepository.save(category);
			return true;
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
	}

	@Override
	public Boolean MakeAdmin(MakeOrRemoveAdminDTO makeAdminDTO) {

		try {
			// Check if the requesting admin has the privilege to assign admin rights to
			// other users
			Long adminPrivilegeCheck = personRoleRepository.findPersonRoleIdByPersonIdAndRoleId(
					makeAdminDTO.getAdminID(), RoleNamesConstants.APPLICATION_ADMINISTRATOR);
			if (adminPrivilegeCheck == null) {
				throw new RuntimeException("Admin not found or insufficient privileges to assign the role.");
			}
			PersonEntity person = personRepository.findById(makeAdminDTO.getPersonId())
					.orElseThrow(() -> new RuntimeException("User not found"));
			RoleEntity role = roleRepository.findById(makeAdminDTO.getRole())
					.orElseThrow(() -> new RuntimeException("Role not found"));
			PersonEntity admin = personRepository.findById(makeAdminDTO.getAdminID())
					.orElseThrow(() -> new RuntimeException("Admin not found"));
			PersonRoleEntity personRoleEntity = new PersonRoleEntity();
			personRoleEntity.setPerson(person);
			personRoleEntity.setRole(role);
			personRoleEntity.setUpdateUser(admin);
			personRoleEntity.setUpdateTimestamp(Timestamp.from(Instant.now()));
			personRoleRepository.save(personRoleEntity);
			return true;
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
	}

	@Override
	public Boolean removeAdmin(MakeOrRemoveAdminDTO makeOrRemoveAdminDTO) {
		try {
			// Check if the requesting admin has the privilege to revoke admin rights from
			// other users
			Long adminPrivilegeCheck = personRoleRepository.findPersonRoleIdByPersonIdAndRoleId(
					makeOrRemoveAdminDTO.getAdminID(), makeOrRemoveAdminDTO.getRole());
			if (adminPrivilegeCheck == null) {
				throw new RuntimeException("Admin not found or insufficient privileges to remove the role.");
			}
			// Check if the target user currently has admin privileges
			Long userAdminCheck = personRoleRepository.findPersonRoleIdByPersonIdAndRoleId(
					makeOrRemoveAdminDTO.getPersonId(), makeOrRemoveAdminDTO.getRole());
			if (userAdminCheck == null) {
				throw new RuntimeException("The user does not already have admin privileges");
			}
			// Remove the admin privilege from the target user
			personRoleRepository.removeAdminPrivilege(makeOrRemoveAdminDTO.getPersonId(),
					makeOrRemoveAdminDTO.getRole());
			return true;
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
	}

	@Override
	public List<TicketResponseDTO> getAllAssignedToMeTickets(ServiceTicketsDetailsDTO serviceTicketsDetailsDTO) {
		try {
			Long offset = serviceTicketsDetailsDTO.getPageNumber() * serviceTicketsDetailsDTO.getPageSize();

			// Validate if the person making the request is an admin
			Long adminPrivilegeCheck = personRoleRepository.findPersonRoleIdByPersonIdAndRoleId(
					serviceTicketsDetailsDTO.getPersonID(), RoleNamesConstants.APPLICATION_ADMINISTRATOR);
			if (adminPrivilegeCheck == null) {
				throw new RuntimeException("Unauthorized access: The person making the request is not an admin.");
			}
			List<SRTicketsEntity> tickets = ticketsRepository.findAllAssignedToMeTickets(
					serviceTicketsDetailsDTO.getPersonID(), serviceTicketsDetailsDTO.getStatusType(),
					serviceTicketsDetailsDTO.getPageSize(), offset);
			List<TicketResponseDTO> ticketDTOs = new ArrayList<>();
			for (SRTicketsEntity ticket : tickets) {
				TicketResponseDTO dto = new TicketResponseDTO();
				dto.setTicketId(ticket.getSrTicketId());
				dto.setCategory(ServiceRequestUtil.getCategoryDetails(ticket.getCategory()));
				dto.setRequestDescription(ticket.getDescription());
				dto.setStatusDescription(ServiceRequestUtil.getStatusDetails(ticket.getStatus()));
				dto.setCreateTimestamp(ticket.getCreateTimestamp());
				dto.setUpdateTimestamp(ticket.getUpdateTimestamp());
				Long statusType = serviceTicketsDetailsDTO.getStatusType();
				if (!statusType.equals(SRTicketStatusConstants.IN_PROGRESS)) {
					dto.setAssignedTo(ServiceRequestUtil.getAdminDetails(ticket.getAssignedTo()));
				}
				List<SRTicketCommentsEntity> comments = commentRepository.findAllByTicketId(ticket.getSrTicketId());
				if (comments != null && !comments.isEmpty()) {
					List<CommentDetailsDTO> commentDetailsDTOs = new ArrayList<>();
					for (SRTicketCommentsEntity comment : comments) {
						CommentDetailsDTO commentDetailsDTO = new CommentDetailsDTO();
						commentDetailsDTO.setCommentId(comment.getCommentId());
						commentDetailsDTO.setStatus(ServiceRequestUtil.getStatusDetails(comment.getStatusCode()));
						commentDetailsDTO.setComment(comment.getComment());
						commentDetailsDTO.setCommentUser(ServiceRequestUtil.getAdminDetails(comment.getCommentUser()));
						commentDetailsDTO.setCommentTimestamp(comment.getCommentTimestamp());
						commentDetailsDTOs.add(commentDetailsDTO);
					}
					dto.setComment(commentDetailsDTOs);
				}
				ticketDTOs.add(dto);
			}
			return ticketDTOs;
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
	}

}
