package com.example.polusServiceRequest.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.polusServiceRequest.DTOs.MakeOrRemoveAdminDTO;
import com.example.polusServiceRequest.DTOs.NewServiceCategoryDTO;
import com.example.polusServiceRequest.DTOs.ServiceTicketsDetailsDTO;
import com.example.polusServiceRequest.DTOs.TicketApproveOrRejectDTO;
import com.example.polusServiceRequest.DTOs.TicketResponseDTO;
import com.example.polusServiceRequest.services.AdminService;

@RestController
@RequestMapping("/api")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@PostMapping("/statusChangeToApprovedOrRejected")
	public ResponseEntity<Object> ticketStatusChangeTOApprovedOrRejected(
			@RequestBody TicketApproveOrRejectDTO ticketDTO) {
		Map<String, String> response = new HashMap<>();
		try {
			boolean actionCompleted = adminService.approveOrRejectTicket(ticketDTO);
			if (actionCompleted) {
				response.put("message", "Ticket status changed to Approved/Rejected.");
				return ResponseEntity.status(HttpStatus.CREATED).body(response);
			} else {
				response.put("message", "Failed to change the ticket status to approved/rejected.");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
		} catch (Exception e) {
			response.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}

	}

	@PostMapping("/createNewServiceCategory")
	public ResponseEntity<Object> createNewServiceCategory(@RequestBody NewServiceCategoryDTO categoryDTO) {
		Map<String, String> response = new HashMap<>();
		try {
			boolean actionCompleted = adminService.CreateNewServiceCategory(categoryDTO);
			if (actionCompleted) {
				response.put("message", "New service created successfully");
				return ResponseEntity.status(HttpStatus.CREATED).body(response);
			} else {
				response.put("message", "Failed to create new service category");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
		} catch (Exception e) {
			response.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@PostMapping("/makeAdmin")
	public ResponseEntity<Object> MakeAdmin(@RequestBody MakeOrRemoveAdminDTO makeAdminDTO) {
		Map<String, String> response = new HashMap<>();
		try {
			boolean actionCompleted = adminService.MakeAdmin(makeAdminDTO);
			if (actionCompleted) {
				response.put("message", "Role assigned Successfully");
				return ResponseEntity.status(HttpStatus.CREATED).body(response);
			} else {
				response.put("message", "Role assigned Failed");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
		} catch (Exception e) {
			response.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@PostMapping("/removeAdmin")
	public ResponseEntity<Object> removeAdmin(@RequestBody MakeOrRemoveAdminDTO makeAdminDTO) {
		Map<String, String> response = new HashMap<>();
		try {
			boolean actionCompleted = adminService.removeAdmin(makeAdminDTO);
			if (actionCompleted) {
				response.put("message", "Admin privilege removed successfully");
				return ResponseEntity.status(HttpStatus.OK).body(response);
			} else {
				response.put("message", "Failed to remove admin privilege");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
		} catch (Exception e) {
			response.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@PostMapping("getAllAssignedToMeTickets")
	public ResponseEntity<Object> getAllAssignedToMeTickets(
			@RequestBody ServiceTicketsDetailsDTO serviceTicketsDetailsDTO) {
		Map<String, String> response = new HashMap<>();
		try {
			List<TicketResponseDTO> tickets = adminService.getAllAssignedToMeTickets(serviceTicketsDetailsDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body(tickets);
		} catch (Exception e) {
			response.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}

	}
}
