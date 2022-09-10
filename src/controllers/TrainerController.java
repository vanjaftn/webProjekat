package controllers;

import com.google.gson.Gson;

import beans.Trainer;
import services.TrainerService;
import services.TrainingService;

import static spark.Spark.get;
import static spark.Spark.post;

public class TrainerController {

	private TrainingService trainingService ;	
	private TrainerService trainerService ;
	private static Gson gson = new Gson();
	
	public TrainerController(TrainerService trainerService ) {
		super();
		this.trainerService  = trainerService ;
		
		get("/getTrainer", (req, res) -> {
			res.type("application/json");
			try {
				
				String jwt = req.queryParams("jwt");
				String trainer = trainerService.getTrainerByJwt(jwt);
				return trainer;
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		get("/getAllTrainers", (req, res) -> {
			res.type("application/json");
			try {
				
				return gson.toJson(trainerService.getAllTrainers());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
	}
		

}
