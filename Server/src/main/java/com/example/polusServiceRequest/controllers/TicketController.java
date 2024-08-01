package com.example.polusServiceRequest.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.polusServiceRequest.DTOs.PersonDTO;
import com.example.polusServiceRequest.DTOs.RequestCountsDTO;
import com.example.polusServiceRequest.DTOs.RoleDTO;
import com.example.polusServiceRequest.DTOs.SRTicketCategoryDTO;
import com.example.polusServiceRequest.DTOs.ServiceTicketDTO;
import com.example.polusServiceRequest.DTOs.ServiceTicketsDetailsDTO;
import com.example.polusServiceRequest.DTOs.StatusDTO;
import com.example.polusServiceRequest.DTOs.TicketResponseDTO;
import com.example.polusServiceRequest.services.SRTicketCategoryService;
import com.example.polusServiceRequest.services.SRTicketService;

@RestController
@RequestMapping("/api")
public class TicketController {

	@Autowired
	private SRTicketCategoryService categoryService;

	@Autowired
	private SRTicketService ticketService;

	@GetMapping("/getAllServiceCategories")
	public ResponseEntity<List<SRTicketCategoryDTO>> getServiceCategories() {
		try {
			List<SRTicketCategoryDTO> categories = categoryService.getAllCategories();
			return ResponseEntity.ok().body(categories);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@DeleteMapping("/deleteServiceTicket/{ticketId}")
	public ResponseEntity<?> deleteServiceTicket(@PathVariable Long ticketId) {
		Map<String, String> response = new HashMap<>();
		try {
			Boolean actionCompleted = ticketService.deleteServiceTicket(ticketId);

			if (actionCompleted) {
				response.put("message", "Ticket Deleted Successfully.");
				return ResponseEntity.status(HttpStatus.CREATED).body(response);
			} else {
				response.put("message", "Failed to delete the ticket ");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
			}
		} catch (Exception e) {
			response.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@PostMapping("getServiceTickets")
	public ResponseEntity<Object> getServiceTickets(@RequestBody ServiceTicketsDetailsDTO serviceTicketsDetailsDTO) {
		Map<String, String> response = new HashMap<>();
		try {
			List<TicketResponseDTO> tickets = ticketService.getServiceTickets(serviceTicketsDetailsDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body(tickets);
		} catch (Exception e) {
			response.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}

	}

	@PostMapping("/createOrEditServiceTicket")
	public ResponseEntity<Object> createOrEditServiceTicket(@RequestBody ServiceTicketDTO ticketDTO) {
		Map<String, String> response = new HashMap<>();
		try {
			return ticketService.createOrEditTicket(ticketDTO);
		} catch (Exception e) {
			response.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@PostMapping("/ticketStatusChangeToAssigned")
	public ResponseEntity<Object> ticketStatusChangeToAssigned(@RequestBody ServiceTicketDTO ticketDTO) {
		Map<String, String> response = new HashMap<>();
		try {
			boolean actionCompleted = ticketService.setTicketStatusAssigned(ticketDTO);
			if (actionCompleted) {
				response.put("message", "Ticket status changed to Assigned.");
				return ResponseEntity.status(HttpStatus.CREATED).body(response);
			} else {
				response.put("message", "Failed to change the ticket status to assigned.");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
		} catch (Exception e) {

			response.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}

	}

	@GetMapping("/getAllUsersByRoleId/{roleID}")
	public ResponseEntity<List<PersonDTO>> getAllUsersByRoleId(@PathVariable("roleID") Long roleID) {
		try {
			List<PersonDTO> normalUsers = ticketService.getAllUsersByroleId(roleID);
			return ResponseEntity.ok().body(normalUsers);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/getAllRequestCountsByPersonID/{personID}")
	public ResponseEntity<Object> getAllRequestsCountsByPersonID(@PathVariable("personID") Long personID) {
		Map<String, String> response = new HashMap<>();
		try {
			RequestCountsDTO countsDTO = ticketService.getRequestCounts(personID);
			return ResponseEntity.ok().body(countsDTO);
		} catch (Exception e) {
			response.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	@GetMapping("/getAllServiceTicketsByPersonID/{personID}")
	public ResponseEntity<Object> getAllServiceTicketsByPersonID(@PathVariable("personID") Long personID) {
		Map<String, String> response = new HashMap<>();
		try {
			List<TicketResponseDTO> ticketResponseDTO = ticketService.getAllServiceTicketsByPersonID(personID);
			return ResponseEntity.ok().body(ticketResponseDTO);
		} catch (Exception e) {
			response.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@GetMapping("/getAllStatuses")
	public ResponseEntity<List<StatusDTO>> getAllStatuses() {
		try {
			List<StatusDTO> statuses = ticketService.getAllStatuses();
			return ResponseEntity.ok().body(statuses);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/getAllRoles")
	public ResponseEntity<List<RoleDTO>> getAllRoles() {
		try {
			List<RoleDTO> statuses = ticketService.getAllRoles();
			return ResponseEntity.ok().body(statuses);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/editRejectedTickets")
	public ResponseEntity<Object> editRejectedTickets(@RequestBody ServiceTicketDTO ticketDTO) {
		Map<String, String> response = new HashMap<>();
		try {
			boolean actionCompleted = ticketService.editRejectedTicket(ticketDTO);
			if (actionCompleted) {
				response.put("message", "Ticket is resubmitted");
				return ResponseEntity.status(HttpStatus.CREATED).body(response);
			} else {
				response.put("message", "Failed");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
		} catch (Exception e) {

			response.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}

	}

}
