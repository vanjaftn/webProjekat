package main;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;

import controllers.CustomerController;
import controllers.FacilityController;
import controllers.ManagerController;
import controllers.TrainerController;
import controllers.TrainingController;
import controllers.UserController;
import dao.CustomerDAO;
import dao.FacilityDAO;
import dao.ManagerDAO;
import dao.TrainerDAO;
import dao.TrainingDAO;
import dao.UserDAO;
import services.CustomerService;
import services.FacilityService;
import services.ManagerService;
import services.TrainerService;
import services.TrainingService;
import services.UserService;

public class Main {

	public static void main(String[] args) throws Exception {
		port(8080);
		
		staticFiles.externalLocation(new File("./static").getCanonicalPath()); 
		
		get("/test", (req, res) -> {
			return "Works";
		});
		
		UserDAO usersDAO = new UserDAO("./data/users.json");
		UserService usersService = new UserService(usersDAO);
		UserController usersController = new UserController(usersService);
		
		FacilityDAO facilityDAO = new FacilityDAO("./data/facilities.json");
		FacilityService facilityService = new FacilityService(facilityDAO);
		FacilityController facilityController = new FacilityController(facilityService);
	
		ManagerDAO managerDAO = new ManagerDAO("./data/managers.json");
		ManagerService managerService = new ManagerService(managerDAO);
		ManagerController managerController = new ManagerController(managerService);
		
		TrainingDAO trainingDAO = new TrainingDAO("./data/trainings.json");
		TrainingService trainingService = new TrainingService(trainingDAO);
		TrainingController trainingController = new TrainingController(trainingService);
		
		TrainerDAO trainerDAO = new TrainerDAO("./data/trainers.json");
		TrainerService trainerService = new TrainerService(trainerDAO);
		TrainerController trainerController = new TrainerController(trainerService);
		
		CustomerDAO customerDAO = new CustomerDAO("./data/customers.json");
		CustomerService customerService = new CustomerService(customerDAO);
		CustomerController customerController = new CustomerController(customerService);
	
	}
}
