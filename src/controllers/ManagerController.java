package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Facility;
import beans.Manager;
import beans.User;
import services.ImportImage;
import services.ManagerService;
import spark.Session;

public class ManagerController {

	private ManagerService managerService;
	private static Gson gson = new Gson();
	private ImportImage decoder = new ImportImage();
	
	public ManagerController(ManagerService managerService) {
		super();
		this.managerService = managerService;
		
		get("/managers/getAllManagersWithoutFacility", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(managerService.getAllManagersWithoutFacility());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
			
		post("/manager/createManager", (req,res) -> {
			res.type("application/json");
			
			try {
				Manager newManager = gson.fromJson(req.body(), Manager.class);
				
				for (Manager manager : managerService.getAllManagers()) {
					if(manager.getUsername().equals(newManager.getUsername())) {
						return "";
					}
				}
				managerService.createManager(newManager);							
				return gson.toJson(newManager);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		post("/manager/setFacilityToManager/:id", (req, res) -> {
			res.type("application/json");
			
			try {
				Manager manager = managerService.getManagerByUserName(req.params("id"));
				Facility facility = gson.fromJson(req.body(), Facility.class);
				
				String path = "images/" + facility.getName() + ".jpg";
				decoder.ImportImage(facility.getImage(), path);
				path = "./" + "images/" + facility.getName() + ".jpg";
				facility.setImage(path);
				manager.setFacility(facility.getName());
				managerService.updateManager(manager);
				
				return gson.toJson(manager);			
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/manager/", (req, res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				return gson.toJson(managerService.getManagerByUserName(loggedUser.getUsername()));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/manager/edit", (req,res) -> {
			res.type("application/json");
			
			try {
				Manager newManager = gson.fromJson(req.body(), Manager.class);
				managerService.updateManager(newManager);
				return true;
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		get("/getManager", (req, res) -> {
			res.type("appliction/json");
			try {
				String jwt = req.queryParams("jwt");
				return managerService.getManager(jwt);
				
			}catch(Exception e){
				return "";
			}
		});
		
		
		
	}
	
}
