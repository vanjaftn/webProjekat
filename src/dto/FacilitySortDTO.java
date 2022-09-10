package dto;

import java.util.ArrayList;

import beans.Facility;

public class FacilitySortDTO {
	
	private String mode;
	private String parameter;
	private ArrayList<Facility> facilities;
	
	public FacilitySortDTO(String mode, String parameter, ArrayList<Facility> facilities) {
		super();
		this.mode = mode;
		this.parameter = parameter;
		this.facilities = facilities;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

	public ArrayList<Facility> getFacilities() {
		return facilities;
	}

	public void setFacilities(ArrayList<Facility> facilities) {
		this.facilities = facilities;
	}	

}
