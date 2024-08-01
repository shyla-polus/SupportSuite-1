package com.example.polusServiceRequest.services;

import java.util.List;

import com.example.polusServiceRequest.DTOs.MakeOrRemoveAdminDTO;
import com.example.polusServiceRequest.DTOs.NewServiceCategoryDTO;
import com.example.polusServiceRequest.DTOs.ServiceTicketsDetailsDTO;
import com.example.polusServiceRequest.DTOs.TicketApproveOrRejectDTO;
import com.example.polusServiceRequest.DTOs.TicketResponseDTO;

public interface AdminService {

	Boolean approveOrRejectTicket(TicketApproveOrRejectDTO ticketDTO);

	Boolean CreateNewServiceCategory(NewServiceCategoryDTO categoryDTO);

	Boolean MakeAdmin(MakeOrRemoveAdminDTO makeOrRemoveAdminDTO);

	Boolean removeAdmin(MakeOrRemoveAdminDTO makeOrRemoveAdminDTO);

	List<TicketResponseDTO> getAllAssignedToMeTickets(ServiceTicketsDetailsDTO serviceTicketsDetailsDTO);

}
