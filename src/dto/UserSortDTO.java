package dto;

import java.util.ArrayList;

import beans.User;

public class UserSortDTO {

	private String mode;
	private String parameter;
	private ArrayList<User> users;
	
	public UserSortDTO(String mode, String parameter, ArrayList<User> users) {
		super();
		this.mode = mode;
		this.parameter = parameter;
		this.users = users;
	}

	public String getMode() {
		return mode;
	}

	public String getParameter() {
		return parameter;
	}

	public ArrayList<User> getUsers() {
		return users;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

	public void setUsers(ArrayList<User> users) {
		this.users = users;
	}
	
	
}
