package dto;

public class UserSearchDTO {
	
	private String name;
	private String lastName;
	private String username;
	
	public UserSearchDTO(String name, String lastName, String username) {
		super();
		this.name = name;
		this.lastName = lastName;
		this.username = username;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
