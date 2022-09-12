package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Facility;
import beans.Manager;
import beans.Training;
import beans.TrainingType;
import dto.FacilitySearchDTO;
import dto.FacilitySortDTO;
import dto.TrainingFilterDTO;
import dto.TrainingSearchDTO;
import dto.TrainingSortDTO;
import services.FacilityService;
import services.TrainingService;

public class TrainingController {
	private TrainingService trainingService;
	private static Gson gson = new Gson();
	
	public TrainingController(TrainingService trainingService ) {
		super();
		this.trainingService  = trainingService ;
		
		get("/getTrainingTypes", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(trainingService .getTrainingTypes());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		post("/searchTrainings", (req,res) -> {
			res.type("application/json");
			
			try {
				TrainingSearchDTO parameters = gson.fromJson(req.body(), TrainingSearchDTO.class);
				return gson.toJson(trainingService.getSearchedTrainingsTrainer(parameters));
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		post("/training/createNewTraining", (req,res) -> {
			res.type("application/json");
			
			try {
				Training newTraining = gson.fromJson(req.body(), Training.class);
				if(trainingService.getAllTrainings().size() != 0)
				{
					for (Training training : trainingService.getAllTrainings()) {
						if(training.getName().equals(newTraining.getName())) {
							System.out.println("Vec postoji");
							return "";
						}
					}
				}
				trainingService.createNewTraining(newTraining);				
				return gson.toJson(newTraining);
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		get("/getFacilityTrainings", (req,res) -> {
			res.type("application/json");
			try {
				String facilityName = req.queryParams("facility");
				return gson.toJson(trainingService.getFacilityTrainings(facilityName));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getTrainerTrainings", (req, res) -> {
			res.type("application/json");
			try {
				String trainerName = req.queryParams("trainer");
				return gson.toJson(trainingService.getTrainerTrainings(trainerName));
				
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getCustomerTrainings", (req, res) -> {
			res.type("application/json");
			try {
				String customerName = req.queryParams("customer");
				return gson.toJson(trainingService.getCustomerTrainings(customerName));
				
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getGymTrainings", (req, res) -> {
			res.type("application/json");
			try {
				String facility = req.queryParams("facility");
				return gson.toJson(trainingService.getGymTrainings(facility));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getPersonalTrainings", (req, res) -> {
			res.type("application/json");
			try {
				String facility = req.queryParams("facility");
				return gson.toJson(trainingService.getPersonalTrainings(facility));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getGroupTrainings", (req, res) -> {
			res.type("application/json");
			try {
				String facility = req.queryParams("facility");
				return gson.toJson(trainingService.getGroupTrainings(facility));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		post("/sortTrainings", (req, res) -> {
			res.type("application/json");
			try {
				TrainingSortDTO sortParameters = gson.fromJson(req.body(), TrainingSortDTO.class);
				return  gson.toJson(trainingService.getTrainingsSorted(sortParameters));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getGymTrainingsCustomer", (req, res) -> {
			res.type("application/json");
			try {
				String customer = req.queryParams("customer");
				return gson.toJson(trainingService.getGymTrainingsCustomer(customer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getPersonalTrainingsCustomer", (req, res) -> {
			res.type("application/json");
			try {
				String customer = req.queryParams("customer");
				return gson.toJson(trainingService.getPersonalTrainingsCustomer(customer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getGroupTrainingsCustomer", (req, res) -> {
			res.type("application/json");
			try {
				String customer = req.queryParams("customer");
				return gson.toJson(trainingService.getGroupTrainingsCustomer(customer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getGymTrainingsTrainer", (req, res) -> {
			res.type("application/json");
			try {
				String trainer = req.queryParams("trainer");
				return gson.toJson(trainingService.getGymTrainingsTrainer(trainer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getPersonalTrainingsTrainer", (req, res) -> {
			res.type("application/json");
			try {
				String trainer = req.queryParams("trainer");
				return gson.toJson(trainingService.getPersonalTrainingsTrainer(trainer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getGroupTrainingsTrainer", (req, res) -> {
			res.type("application/json");
			try {
				String trainer = req.queryParams("trainer");
				return gson.toJson(trainingService.getGroupTrainingsTrainer(trainer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		post("/sortTrainingsTrainer", (req, res) -> {
			res.type("application/json");
			try {
				TrainingSortDTO sortParameters = gson.fromJson(req.body(), TrainingSortDTO.class);
				return  gson.toJson(trainingService.getSortedTrainingsTrainer(sortParameters));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		post("/sortTrainingsCustomer", (req, res) -> {
			res.type("application/json");
			try {
				TrainingSortDTO sortParameters = gson.fromJson(req.body(), TrainingSortDTO.class);
				return  gson.toJson(trainingService.getSortedTrainingsCustomer(sortParameters));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getGymFacilityTrainingsTrainer", (req, res) -> {
			res.type("application/json");
			try {
				String trainer = req.queryParams("trainer");
				return gson.toJson(trainingService.getGymFacilityTrainingsTrainer(trainer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getPoolFacilityTrainingsTrainer", (req, res) -> {
			res.type("application/json");
			try {
				String trainer = req.queryParams("trainer");
				return gson.toJson(trainingService.getPoolFacilityTrainingsTrainer(trainer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getDanceFacilityTrainingsTrainer", (req, res) -> {
			res.type("application/json");
			try {
				String trainer = req.queryParams("trainer");
				return gson.toJson(trainingService.getDanceFacilityTrainingsTrainer(trainer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getSportsFacilityTrainingsTrainer", (req, res) -> {
			res.type("application/json");
			try {
				String customer = req.queryParams("customer");
				return gson.toJson(trainingService.getSportsFacilityTrainingsCustomer(customer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getGymFacilityTrainingsCustomer", (req, res) -> {
			res.type("application/json");
			try {
				String customer = req.queryParams("customer");
				return gson.toJson(trainingService.getGymFacilityTrainingsCustomer(customer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getPoolFacilityTrainingsCustomer", (req, res) -> {
			res.type("application/json");
			try {
				String customer = req.queryParams("customer");
				return gson.toJson(trainingService.getPoolFacilityTrainingsCustomer(customer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getDanceFacilityTrainingsCustomer", (req, res) -> {
			res.type("application/json");
			try {
				String customer = req.queryParams("customer");
				return gson.toJson(trainingService.getDanceFacilityTrainingsCustomer(customer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		get("/getSportsFacilityTrainingsCustomer", (req, res) -> {
			res.type("application/json");
			try {
				String customer = req.queryParams("customer");
				return gson.toJson(trainingService.getSportsFacilityTrainingsCustomer(customer));
			}catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
	}

}
