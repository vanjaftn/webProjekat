package dto;

public class FacilitySearchDTO {

	private String name;
	private String location;
	private String type;
	private String grade;
	
	public FacilitySearchDTO(String name, String location, String type, String grade) {
		super();
		this.name = name;
		this.location = location;
		this.type = type;
		this.grade = grade;
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
	
	
	
}
