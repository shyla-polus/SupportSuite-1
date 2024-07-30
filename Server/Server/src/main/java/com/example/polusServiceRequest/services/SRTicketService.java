package com.example.polusServiceRequest.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.polusServiceRequest.DTOs.PersonDTO;
import com.example.polusServiceRequest.DTOs.RequestCountsDTO;
import com.example.polusServiceRequest.DTOs.RoleDTO;
import com.example.polusServiceRequest.DTOs.ServiceTicketDTO;
import com.example.polusServiceRequest.DTOs.ServiceTicketsDetailsDTO;
import com.example.polusServiceRequest.DTOs.StatusDTO;
import com.example.polusServiceRequest.DTOs.TicketResponseDTO;

public interface SRTicketService {

	Boolean deleteServiceTicket(Long ticketId);

	List<TicketResponseDTO> getServiceTickets(ServiceTicketsDetailsDTO serviceTicketsDetailsDTO);

	ResponseEntity<Object> createOrEditTicket(ServiceTicketDTO ticketDTO);

	Boolean setTicketStatusAssigned(ServiceTicketDTO ticketDTO);

	RequestCountsDTO getRequestCounts(Long personId);

	List<TicketResponseDTO> getAllServiceTicketsByPersonID(Long personID);

	List<StatusDTO> getAllStatuses();

	List<PersonDTO> getAllUsersByroleId(Long roleId);

	List<RoleDTO> getAllRoles();

	Boolean editRejectedTicket(ServiceTicketDTO ticketDTO);
}
