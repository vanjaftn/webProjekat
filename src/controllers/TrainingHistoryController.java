package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import com.google.gson.Gson;

import dto.JoinTrainingDTO;
import services.TrainingHistoryService;

public class TrainingHistoryController {
	private TrainingHistoryService trainingHistoryService;
	private static Gson gson = new Gson();

	public TrainingHistoryController(TrainingHistoryService trainingHistoryService) {
		super();
		this.trainingHistoryService = trainingHistoryService;

	
	post("/joinTraining", (req, res) -> {
		res.type("application/json");
		try {
			JoinTrainingDTO parameters = gson.fromJson(req.body(), JoinTrainingDTO.class);
			return gson.toJson(trainingHistoryService.joinTraining(parameters));
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	});
}
	
}
