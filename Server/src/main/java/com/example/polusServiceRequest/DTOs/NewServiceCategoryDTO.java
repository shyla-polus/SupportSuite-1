package com.example.polusServiceRequest.DTOs;

import lombok.Data;

@Data
public class NewServiceCategoryDTO {

	private Long adminId;
	private String categoryName;
	private String description;

	public Long getAdminId() {
		return adminId;
	}

}
