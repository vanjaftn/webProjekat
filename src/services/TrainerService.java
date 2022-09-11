package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Manager;
import beans.Trainer;
import dao.TrainerDAO;

public class TrainerService {
	
	private TrainerDAO trainerDAO;
	private UserService userService;
	private static Gson gson = new Gson();
	
	public TrainerService(TrainerDAO trainerDAO) {
		super();
		this.trainerDAO = trainerDAO;
	}
	
	public Trainer getTrainerByUsername(String username) throws JsonSyntaxException, IOException {
		return trainerDAO.getByID(username);
	}
	
	public String getTrainerByJwt(String jwt)throws JsonSyntaxException, IOException {
		String username = userService.getUsernameFromJWT(jwt);
		String trainer = gson.toJson(getTrainerByUsername(username));
		return trainer;
	}
	
	public ArrayList<Trainer> getAllTrainers() throws JsonSyntaxException, IOException {
		return trainerDAO.getAll();
	}
	
	public void updateTrainer(Trainer trainer) throws JsonSyntaxException, IOException {
		this.trainerDAO.update(trainer);
	}
	
	public void createTrainer(Trainer trainer) throws JsonSyntaxException, IOException {
		trainerDAO.create(trainer);
	}

}
