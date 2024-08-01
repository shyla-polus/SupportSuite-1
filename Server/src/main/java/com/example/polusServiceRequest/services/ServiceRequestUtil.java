package com.example.polusServiceRequest.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.example.polusServiceRequest.DTOs.PersonDTO;
import com.example.polusServiceRequest.DTOs.RoleDTO;
import com.example.polusServiceRequest.DTOs.SRTicketCategoryDTO;
import com.example.polusServiceRequest.DTOs.StatusDTO;
import com.example.polusServiceRequest.constants.SRTicketStatusConstants;
import com.example.polusServiceRequest.models.PersonEntity;
import com.example.polusServiceRequest.models.PersonRoleEntity;
import com.example.polusServiceRequest.models.SRTicketCategoryEntity;
import com.example.polusServiceRequest.models.SRTicketHistoryEntity;
import com.example.polusServiceRequest.models.SRTicketStatusEntity;
import com.example.polusServiceRequest.models.SRTicketsEntity;
import com.example.polusServiceRequest.repositories.SRTicketHistoryRepository;

public class ServiceRequestUtil {

	public static PersonDTO getAdminDetails(PersonEntity person) {

		PersonDTO adminDTO = new PersonDTO();
		adminDTO.setPersonId(person.getPersonId());
		adminDTO.setName(person.getFullName());
		List<RoleDTO> roleDTOs = new ArrayList<>();
		for (PersonRoleEntity personRole : person.getRoles()) {
			RoleDTO roleDTO = new RoleDTO();
			roleDTO.setRoleId(personRole.getRole().getRoleId());
			roleDTO.setRoleName(personRole.getRole().getRoleName());
			roleDTO.setRoleDescription(personRole.getRole().getRoleDescription());
			roleDTOs.add(roleDTO);
		}
		adminDTO.setRoles(roleDTOs);
		return adminDTO;
	}

	public static StatusDTO getStatusDetails(SRTicketStatusEntity status) {

		StatusDTO dto = new StatusDTO();
		dto.setStatusCode(status.getStatusCode());
		dto.setStatus(status.getStatusDescription());
		return dto;
	}

	public static SRTicketCategoryDTO getCategoryDetails(SRTicketCategoryEntity category) {

		SRTicketCategoryDTO dto = new SRTicketCategoryDTO();
		dto.setCategoryCode(category.getCategoryCode());
		dto.setCategoryName(category.getCategoryName());
		dto.setDescription(category.getDescription());
		return dto;
	}

	public static void setHistoryDetails(SRTicketsEntity ticket, SRTicketHistoryRepository historyRepository) {
		SRTicketHistoryEntity history = new SRTicketHistoryEntity();
		history.setSrTicket(ticket);
		history.setStatusCode(ticket.getStatus());
		if (ticket.getStatus().getStatusCode().equals(SRTicketStatusConstants.APPROVED)
				|| ticket.getStatus().getStatusCode().equals(SRTicketStatusConstants.REJECTED)) {
			history.setUpdateUser(ticket.getAssignedTo());
		} else {
			history.setUpdateUser(ticket.getPerson());
		}
		history.setUpdateTimestamp(Timestamp.from(Instant.now()));
		historyRepository.save(history);
	}
}
