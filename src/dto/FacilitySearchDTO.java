package dto;

import java.util.ArrayList;

import beans.Facility;

public class FacilitySearchDTO {

	private String name;
	private String location;
	private String type;
	private String grade;
	private ArrayList<Facility> facilities;
	
	public FacilitySearchDTO(String name, String location, String type, String grade, ArrayList<Facility> facilities) {
		super();
		this.name = name;
		this.location = location;
		this.type = type;
		this.grade = grade;
		this.facilities = facilities;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public ArrayList<Facility> getFacilities() {
		return facilities;
	}

	public void setFacilities(ArrayList<Facility> facilities) {
		this.facilities = facilities;
	}
	
	
	
}
