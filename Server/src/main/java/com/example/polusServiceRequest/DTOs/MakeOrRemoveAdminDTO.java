package com.example.polusServiceRequest.DTOs;

import lombok.Data;

@Data
public class MakeOrRemoveAdminDTO {

	private Long personId;
	private Long role;
	private Long adminId;
	public Long getPersonId() {
		return personId;
	}
	public void setPersonId(Long personId) {
		this.personId = personId;
	}
	public Long getRole() {
		return role;
	}
	public void setRole(Long role) {
		this.role = role;
	}
	public Long getAdminID() {
		return adminId;
	}
	public void setAdminID(Long adminID) {
		this.adminId = adminID;
	}
	
}
