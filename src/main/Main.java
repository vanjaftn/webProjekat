package main;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;

import controllers.CommentController;
import controllers.CustomerController;
import controllers.FacilityController;
import controllers.ManagerController;
import controllers.MembershipController;
import controllers.TrainerController;
import controllers.TrainingController;
import controllers.TrainingHistoryController;
import controllers.UserController;
import dao.CommentDAO;
import dao.CustomerDAO;
import dao.FacilityDAO;
import dao.ManagerDAO;
import dao.MembershipDAO;
import dao.TrainerDAO;
import dao.TrainingDAO;
import dao.TrainingHistoryDAO;
import dao.UserDAO;
import services.CommentService;
import services.CustomerService;
import services.FacilityService;
import services.ManagerService;
import services.MembershipService;
import services.TrainerService;
import services.TrainingHistoryService;
import services.TrainingService;
import services.UserService;

public class Main {

	public static void main(String[] args) throws Exception {
		port(8087);
		
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
	
		CommentDAO commentDAO = new CommentDAO("./data/comments.json");
		CommentService commentService = new CommentService(commentDAO);
		CommentController commentController = new CommentController(commentService);
	
		MembershipDAO membershipDAO = new MembershipDAO("./data/memberships.json");
		MembershipService membershipService = new MembershipService(membershipDAO);
		MembershipController membershipController = new MembershipController(membershipService);
	
		TrainingHistoryDAO trainingHistoryDAO = new TrainingHistoryDAO("./data/trainingHistory.json");
		TrainingHistoryService trainingHistoryService = new TrainingHistoryService(trainingHistoryDAO);
		TrainingHistoryController trainingHistoryController = new TrainingHistoryController(trainingHistoryService);
		
	}
}
