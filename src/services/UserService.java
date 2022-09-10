package services;

import java.io.IOException;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.User;
import dao.UserDAO;
import dto.LoginDTO;
import dto.UserSearchDTO;
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
		ArrayList<User> allUsers = getAll();
		ArrayList<User> searchedUser = getAll();
		
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

}
