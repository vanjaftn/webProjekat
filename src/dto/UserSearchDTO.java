package dto;

import java.util.ArrayList;

import beans.User;

public class UserSearchDTO {
	
	private String name;
	private String lastName;
	private String username;
	private ArrayList<User> users;
	
	public UserSearchDTO(String name, String lastName, String username,ArrayList<User> users) {
		super();
		this.name = name;
		this.lastName = lastName;
		this.username = username;
		this.setUsers(users);
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
	public ArrayList<User> getUsers() {
		return users;
	}
	public void setUsers(ArrayList<User> users) {
		this.users = users;
	}
	
	
}
