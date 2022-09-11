package services;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Trainer;
import beans.Training;
import beans.TrainingHistory;
import dao.CustomerDAO;
import dao.FacilityDAO;
import dao.TrainerDAO;
import dao.TrainingDAO;
import dao.TrainingHistoryDAO;
import dto.JoinTrainingDTO;

public class TrainingHistoryService {
	private ImportImage decoder = new ImportImage();
	private static Gson gson = new Gson();
	private TrainingDAO trainingDAO = new TrainingDAO("./data/trainings.json");
	private TrainingService trainingService = new TrainingService(trainingDAO);
	private FacilityDAO facilityDAO = new FacilityDAO("./data/facilities.json");
	private FacilityService facilityService = new FacilityService(facilityDAO);
	private TrainerDAO trainerDAO = new TrainerDAO("./data/trainers.json");
	private TrainerService trainerService = new TrainerService(trainerDAO);
	/*private CustomerDAO customerDAO = new CustomerDAO("./data/customer.json");
	private CustomerService customerService = new CustomerService(customerDAO);
	*/
	private TrainingHistoryDAO trainingHistoryDAO;
	private TrainingHistoryService trainingHistoryService;
	
	public TrainingHistoryService(TrainingHistoryDAO trainingHistoryDAO) {
		super();
		this.trainingHistoryDAO = trainingHistoryDAO;
	}
	
	
	public TrainingHistory getTrainingHistoryByTraining(String trainingName) throws JsonSyntaxException, IOException{
		ArrayList<TrainingHistory> trainingsHistory = trainingHistoryDAO.getAll();
		
		for(TrainingHistory th : trainingsHistory)
			if(th.getTraining().equals(trainingName))
				return th;
		return null;
	}
	
	public Boolean joinTraining(JoinTrainingDTO parameters) throws JsonSyntaxException, IOException{
		
		Training training = trainingService.getTrainingByName(parameters.getTrainingName());
		String trainer = training.getTrainer();
		String id = UUID.randomUUID().toString();
		
		TrainingHistory newTrainingHistory = new TrainingHistory(LocalDateTime.now(),parameters.getTrainingName(),parameters.getCustomerUsername(),trainer, id);
		trainingHistoryDAO.create(newTrainingHistory);
		return true;
	}

}
