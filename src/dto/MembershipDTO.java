package dto;

import java.util.ArrayList;

import beans.MembershipItem;

public class MembershipDTO {

	private int appointmentNumber;
	private String name;
	private String facility;
	
	public MembershipDTO(int appointmentNumbers, String name, String facility) {
		super();
		this.appointmentNumber = appointmentNumbers;
		this.name = name;
		this.facility = facility;
	}
	public int getAppointmentNumbers() {
		return appointmentNumber;
	}
	public String getName() {
		return name;
	}
	public String getFacility() {
		return facility;
	}
	public void setAppointmentNumbers(int appointmentNumbers) {
		this.appointmentNumber = appointmentNumbers;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setFacility(String facility) {
		this.facility = facility;
	}
	
	
	
}
