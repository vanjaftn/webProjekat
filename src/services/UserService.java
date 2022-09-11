package services;

import java.io.IOException;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Role;
import beans.User;
import dao.UserDAO;
import dto.LoginDTO;
import dto.UserSearchDTO;
import dto.UserSortDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class UserService {
	
	private UserDAO usersDAO;
	private static Gson gson = new Gson();
    private static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	
	public UserService(UserDAO userDAO) {
		this.usersDAO = userDAO;
	}
	
	public void register(User user) throws JsonSyntaxException, IOException {
		usersDAO.create(user);
	}
	
	public ArrayList<User> getAll() throws JsonSyntaxException, IOException {
		return usersDAO.getAll();
	}
	
	public User login(LoginDTO user) throws JsonSyntaxException, IOException {
		User loggedUser = null;
		if(user.getUsername() != null) 
		{
			loggedUser = usersDAO.getByID(user.getUsername());
		}
		
		if(loggedUser != null) {
			if(user.getPassword().equals(loggedUser.getPassword())) {
				return loggedUser;
			}
		}
		return null;
	}
	
	public String loginUser(User user) throws JsonSyntaxException, IOException {
		String jws = null;
        ArrayList<String> response = new ArrayList<String>();
        
        jws = Jwts.builder().setSubject(user.getUsername())
                .setExpiration(new Date(new Date().getTime() + 600000 * 10L)).setIssuedAt(new Date()).signWith(key).compact();
        response.add(jws);
        response.add(user.getRole().toString());
        
        return gson.toJson(response);
	}
	
	public User getUser(String id) throws JsonSyntaxException, IOException{
		return usersDAO.getByID(id);
	}
	
	public String getUserFromJWT(String token) throws JsonSyntaxException, IOException{
        String username = getUsernameFromJWT(token);
        
            User user = getUser(username);
            String userGson = gson.toJson(user);
            return userGson;
            
    }
	
	public static String getUsernameFromJWT(String token) throws JsonSyntaxException, IOException{
        if (token == null)
            return "";
        String jwt = token;
        Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
        return claims.getBody().getSubject();
    }
	
	public ArrayList<User> getSearchedUsers(UserSearchDTO searchParams) throws JsonSyntaxException, IOException{
		ArrayList<User> allUsers = searchParams.getUsers();
		ArrayList<User> searchedUser = new ArrayList<User>();
		
		if(!searchParams.getName().trim().isEmpty()){
			searchedUser.clear();
			for(User user : allUsers) {
				if(user.getName().toLowerCase().contains(searchParams.getName().toLowerCase()))
					searchedUser.add(user);
			}
			
			allUsers.clear();
			allUsers.addAll(searchedUser);
		}
		
		if(!searchParams.getLastName().trim().isEmpty()) {
			searchedUser.clear();
			for(User user : allUsers) {
				if(user.getLastName().toLowerCase().contains(searchParams.getLastName().toLowerCase())) {
					searchedUser.add(user);
				}
			}
			allUsers.clear();
			allUsers.addAll(searchedUser);
		}
		
		if(!searchParams.getUsername().trim().isEmpty()) {
			searchedUser.clear();
			for(User user : allUsers) {
				if(user.getUsername().toLowerCase().contains(searchParams.getUsername().toLowerCase())) {
					searchedUser.add(user);
				}
			}
			allUsers.clear();
			allUsers.addAll(searchedUser);
		}
		
		
		return searchedUser;
		
	}

	public void editUser(User user) throws JsonSyntaxException, IOException {
		usersDAO.update(user);
	}

	public ArrayList<User> getAllNonDeleted() throws JsonSyntaxException, IOException{
		return usersDAO.getAllNonDeleted();
	}
	
	public ArrayList<User> getSortedUsers(UserSortDTO sortParameters) throws JsonSyntaxException, IOException {
		ArrayList<User> sortedUsers = sortParameters.getUsers();
		
		if(sortParameters.getParameter().equals("name")) {
			if(sortParameters.getMode().equals("asc")) {
				sortedUsers.sort((o1, o2)-> o1.getName().compareTo( o2.getName()));
			}else {
				sortedUsers.sort((o1, o2)-> o2.getName().compareTo( o1.getName()));
			}
		}else if(sortParameters.getParameter().equals("surname")) {
			if(sortParameters.getMode().equals("asc")) {
				sortedUsers.sort((o1, o2)-> o1.getLastName().compareTo( o2.getLastName()));
			}else {
				sortedUsers.sort((o1, o2)-> o2.getLastName().compareTo( o1.getLastName()));
			}
		}
		else if(sortParameters.getParameter().equals("username")) {
			if(sortParameters.getMode().equals("asc")) {
				sortedUsers.sort((o1, o2)-> o1.getUsername().compareTo( o2.getUsername()));
			}else {
				sortedUsers.sort((o1, o2)-> o2.getUsername().compareTo( o1.getUsername()));
			}
		}
		
		return sortedUsers;
	}
		
	public ArrayList<User> getAllAdmins(UserSortDTO sortParameters) throws JsonSyntaxException, IOException {
		
		ArrayList<User> allAdmins = new ArrayList<User>();
				
		for (User user : sortParameters.getUsers()) {
			if(user.getRole().equals(Role.ADMIN)) {
				allAdmins.add(user);
			}
		}
		
		return allAdmins;
	}

	public ArrayList<User> getAllManagers(UserSortDTO sortParameters) throws JsonSyntaxException, IOException {
		
		ArrayList<User> allManagers = new ArrayList<User>();
		
		for (User user : sortParameters.getUsers()) 
			if(user.getRole().equals(Role.MANAGER))
				allManagers.add(user);		
		
		return allManagers;
	}
	
	public ArrayList<User> getAllTrainers(UserSortDTO sortParameters) throws JsonSyntaxException, IOException {
		
		ArrayList<User> allTrainers = new ArrayList<User>();
		
		for (User user : sortParameters.getUsers()) 
			if(user.getRole().equals(Role.TRAINER))
				allTrainers.add(user);		
		
		return allTrainers;
	}
	
	public ArrayList<User> getAllCustomers(UserSortDTO sortParameters) throws JsonSyntaxException, IOException {
		
		ArrayList<User> allCustomers = new ArrayList<User>();
		
		for (User user : sortParameters.getUsers()) 
			if(user.getRole().equals(Role.CUSTOMER))
				allCustomers.add(user);		
		
		return allCustomers;
	}

}
