package com.example.polusServiceRequest.DTOs;

import lombok.Data;

@Data
public class ServiceTicketDTO {

	private Long personId;
	private Long ticketId;
	private Long category;
	private String requestDescription;
	private Long assignedTo;

}
