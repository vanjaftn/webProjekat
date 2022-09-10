package controllers;

import static spark.Spark.post;

import java.util.ArrayList;

import static spark.Spark.get;
import static spark.Spark.put;

import com.google.gson.Gson;

import beans.User;
import dto.LoginDTO;
import dto.UserSearchDTO;
import dto.UserSortDTO;
import services.UserService;
import spark.Session;

public class UserController {

	private UserService userService;
	private static Gson gson = new Gson();

	public UserController(UserService userService) {
		this.userService = userService;
		
		get("/users/getAll", (req,res) -> {
			res.type("application/json");
			try {
				return gson.toJson(userService.getAll());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/user/:id", (req, res) -> {
			res.type("aplication/json");
			try {
				return gson.toJson(userService.getUser(req.params("id")));
			} catch (Exception error){
				error.printStackTrace();
				return "";
			}
		});
		
		post("/user/register", (req,res) -> {
			res.type("application/json");
			
			try {
				User newUser = gson.fromJson(req.body(), User.class);
				
				for(User user : userService.getAll()) {
					if(user.getUsername().equals(newUser.getUsername())){
						return "";
					}
				}
				
				userService.register(newUser);
				Session session = req.session(true);		
				User loggedUser = session.attribute("user");
				if(loggedUser == null)
					session.attribute("user", newUser);
								
				return gson.toJson(newUser);
				
			} catch(Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/user/login", (req,res) -> {
			res.type("application/json");
			
			try {
				User loggedUser = userService.login(gson.fromJson(req.body(), LoginDTO.class));
				if (loggedUser != null) {
					
					return userService.loginUser(loggedUser);
				} else {
					return "";
				}
				
			} catch(Exception e) {
				e.printStackTrace();
				return e;
			}
		});
		
		post("/users/searchUsers", (req, res) -> {
			res.type("applicatio/json");
			try {
				UserSearchDTO searchParams = gson.fromJson(req.body(), UserSearchDTO.class);
				ArrayList<User> users = userService.getSearchedUsers(searchParams);
				return gson.toJson(users);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/user/", (req, res) -> {
			res.type("application/json");
			try {
				Session s = req.session(true);
				User loggedUser = s.attribute("user");
				
				return gson.toJson(loggedUser);
			} catch (Exception e) {
				return "";
			}
		});
		
		get("/getOneUser", (req, res) -> {
			res.type("appliction/json");
			try {
				String jwt = req.queryParams("jwt");
				return userService.getUserFromJWT(jwt);
				
			}catch(Exception e){
				return "";
			}
		});
		
		post("/user/edit", (req, res) -> {
			res.type("application/json");
			try {
				User editedUser = gson.fromJson(req.body(), User.class);
				userService.editUser(editedUser);
				Session s = req.session(true);
				s.attribute("user", editedUser);
				return gson.toJson(editedUser);
			}catch (Exception e) {
				return "";
			}
		});
		
		put("/user/deleteUser/:id", (req, res) -> {
			res.type("application/json");
			try {
				User user = userService.getUser(req.params("id"));
				user.setDeleted(true);
				userService.editUser(user);
				return gson.toJson(userService.getAllNonDeleted());
				
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("/user/sortUsers", (req,res) -> {
			res.type("application/json");
			try {
				UserSortDTO sortParams = gson.fromJson(req.body(), UserSortDTO.class);
				ArrayList<User> users = userService.getSortedUsers(sortParams);
				return gson.toJson(users);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("/users/getAllAdmins", (req, res) -> {
			res.type("application/json");
			try {
				UserSortDTO sortParams = gson.fromJson(req.body(), UserSortDTO.class);
				ArrayList<User> users = userService.getAllAdmins(sortParams);
				return gson.toJson(users);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/users/getAllMAnagers", (req, res) -> {
			res.type("application/json");
			try {
				UserSortDTO sortParams = gson.fromJson(req.body(), UserSortDTO.class);
				ArrayList<User> users = userService.getAllManagers(sortParams);
				return gson.toJson(users);
			
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/users/getAllTrainers", (req, res) -> {
			res.type("application/json");
			try {
				UserSortDTO sortParams = gson.fromJson(req.body(), UserSortDTO.class);
				ArrayList<User> users = userService.getAllTrainers(sortParams);
				return gson.toJson(users);
			
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/users/getAllCustomers", (req, res) -> {
			res.type("application/json");
			try {
				UserSortDTO sortParams = gson.fromJson(req.body(), UserSortDTO.class);
				ArrayList<User> users = userService.getAllCustomers(sortParams);
				return gson.toJson(users);
			
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
	}
}
