package services;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Customer;
import beans.Facility;
import beans.FacilityType;
import beans.Trainer;
import beans.Training;
import beans.TrainingHistory;
import beans.TrainingType;
import dao.CustomerDAO;
import dao.FacilityDAO;
import dao.TrainerDAO;
import dao.TrainingDAO;
import dao.TrainingHistoryDAO;
import dto.TrainingFilterDTO;
import dto.TrainingSearchDTO;
import dto.TrainingSortDTO;

public class TrainingService {
	private TrainingDAO trainingDAO;
	private ImportImage decoder = new ImportImage();
	private static Gson gson = new Gson();
	private FacilityDAO facilityDAO = new FacilityDAO("./data/facilities.json");
	private FacilityService facilityService = new FacilityService(facilityDAO);
	private TrainerDAO trainerDAO = new TrainerDAO("./data/trainers.json");
	private TrainerService trainerService = new TrainerService(trainerDAO);
	private CustomerDAO customerDAO = new CustomerDAO("./data/customer.json");
	private CustomerService customerService = new CustomerService(customerDAO);
	private TrainingHistoryDAO trainingHistoryDAO = new TrainingHistoryDAO("./data/trainingHistory.json");

	public TrainingService(TrainingDAO trainingDAO) {
		super();
		this.trainingDAO = trainingDAO;
	}
	
	public String getTrainingTypes() throws JsonSyntaxException, IOException{
		ArrayList<TrainingType> types = new ArrayList<TrainingType>(Arrays.asList(TrainingType.values()));
		return gson.toJson(types);
	}
	
	public ArrayList<Training> getSearchedTrainingsTrainer(TrainingSearchDTO searchParameters) throws JsonSyntaxException, IOException{
		ArrayList<Training> allTrainings = searchParameters.getTrainings();
		ArrayList<Training> searchedTrainings = new ArrayList<Training>();
	
		if (!searchParameters.getName().trim().isEmpty()) {
			searchedTrainings.clear();
			for (Training training : allTrainings) {
				if (training.getSportsFacility().toLowerCase().contains(searchParameters.getName().toLowerCase()))
					searchedTrainings.add(training);
			}
			
			allTrainings.clear();
			allTrainings.addAll(searchedTrainings);
		}
		
		return searchedTrainings;
	}
	
	public String getTrainingType(Training training) throws JsonSyntaxException, IOException{
		String type = "";
		if(training.getType().equals(TrainingType.GYM)) {
			type = "GYM";
		}
		if(training.getType().equals(TrainingType.GROUP)){
			type = "GROUP";
		}
		if(training.getType().equals(TrainingType.PERSONAL)){
			type = "PERSONAL";
		}
		return type;
	}
	
	public void createNewTraining(Training training) throws JsonSyntaxException, IOException{
		trainingDAO.create(training);
	}
	
	public ArrayList<Training> getAllTrainings()throws JsonSyntaxException, IOException{
		return trainingDAO.getAll();
	}
	
	public ArrayList<Training> getFacilityTrainings(String facilityId)throws JsonSyntaxException, IOException{
		ArrayList<Training> allTrainings = trainingDAO.getAll();
		ArrayList<Training> facilityTrainings = new ArrayList<Training>();
		
		for(Training t : allTrainings) {
			if(t.getSportsFacility().equals(facilityId)) {
				facilityTrainings.add(t);
			}
		}
		return facilityTrainings;
	}
	public ArrayList<Training> getTrainerTrainings(String TrainerName)throws JsonSyntaxException, IOException{
		
		ArrayList<Training> trainings = trainingDAO.getAll();
		ArrayList<Training> trainerTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			if(t.getTrainer().equals(TrainerName))
				trainerTrainings.add(t);
		}
		return trainerTrainings;
	}
	
	public Training getTrainingByName(String trainingName) throws JsonSyntaxException, IOException{
		return trainingDAO.getByID(trainingName);	
	}
	
	public ArrayList<Training> getCustomerTrainings(String CustomerName)throws JsonSyntaxException, IOException{
		
		ArrayList<TrainingHistory> trainingsHistory = trainingHistoryDAO.getAll();
		ArrayList<Training> customerTrainings = new ArrayList<Training>();

		for(TrainingHistory t : trainingsHistory) {
			Training training = getTrainingByName(t.getTraining());
				if(t.getCustomer().equals(CustomerName))
				customerTrainings.add(training);
			}
		
		return customerTrainings;
	}
	
	public ArrayList<Training> getGymTrainings(String facilityName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getFacilityTrainings(facilityName);
		ArrayList<Training> gymTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			if(t.getType().equals(TrainingType.GYM)){
				gymTrainings.add(t);
			}
		}
		return gymTrainings;
	}
	
	public ArrayList<Training> getPersonalTrainings(String facilityName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getFacilityTrainings(facilityName);
		ArrayList<Training> personalTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			if(t.getType().equals(TrainingType.PERSONAL)){
				personalTrainings.add(t);
			}
		}
		return personalTrainings;
	}
	
	public ArrayList<Training> getGroupTrainings(String facilityName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getFacilityTrainings(facilityName);
		ArrayList<Training> groupTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			if(t.getType().equals(TrainingType.GROUP)){
				groupTrainings.add(t);
			}
		}
		return groupTrainings;
	}
	
	public ArrayList<Training> getTrainingsSorted(TrainingSortDTO sortParameter) throws JsonSyntaxException, IOException{
		
		ArrayList<Training> trainings = getFacilityTrainings(sortParameter.getName());
		ArrayList<TrainingHistory> traininsForSort = new ArrayList<TrainingHistory>();
		ArrayList<Training> sortedTrainings = sortParameter.getTrainings();
		Facility facility = facilityService.getFacilityByName(sortParameter.getName());

		if(sortParameter.getParameter().equals("price"))
			if(sortParameter.getMode().equals("asc"))
				sortedTrainings.sort((o1, o2) -> Integer.compare(o1.getPrice(), o2.getPrice()));
			if(sortParameter.getMode().equals("desc"))
				sortedTrainings.sort((o1, o2) -> Integer.compare(o2.getPrice(), o1.getPrice()));
		if(sortParameter.getParameter().equals("facility"))
			if(sortParameter.getMode().equals("asc"))
				sortedTrainings.sort((o1, o2)-> o1.getSportsFacility().compareTo(o2.getSportsFacility()));
			if(sortParameter.getMode().equals("desc"))
				sortedTrainings.sort((o1, o2)-> o2.getSportsFacility().compareTo(o1.getSportsFacility()));
		return sortedTrainings;
	}
	
	public ArrayList<Training> getGymTrainingsCustomer(String customerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getCustomerTrainings(customerName);
		ArrayList<Training> gymTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			if(t.getType().equals(TrainingType.GYM)){
				gymTrainings.add(t);
			}
		}
		return gymTrainings;
	}
	
	public ArrayList<Training> getPersonalTrainingsCustomer(String customerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getCustomerTrainings(customerName);
		ArrayList<Training> personalTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			if(t.getType().equals(TrainingType.PERSONAL)){
				personalTrainings.add(t);
			}
		}
		return personalTrainings;
	}
	
	public ArrayList<Training> getGroupTrainingsCustomer(String customerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getCustomerTrainings(customerName);
		ArrayList<Training> groupTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			if(t.getType().equals(TrainingType.GROUP)){
				groupTrainings.add(t);
			}
		}
		return groupTrainings;
	}
	
	public ArrayList<Training> getGymTrainingsTrainer(String trainerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getTrainerTrainings(trainerName);
		ArrayList<Training> gymTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			if(t.getType().equals(TrainingType.GYM)){
				gymTrainings.add(t);
			}
		}
		return gymTrainings;
	}
	
	public ArrayList<Training> getPersonalTrainingsTrainer(String trainerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getTrainerTrainings(trainerName);
		ArrayList<Training> personalTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			if(t.getType().equals(TrainingType.PERSONAL)){
				personalTrainings.add(t);
			}
		}
		return personalTrainings;
	}
	
	public ArrayList<Training> getGroupTrainingsTrainer(String trainerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getTrainerTrainings(trainerName);
		ArrayList<Training> groupTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			if(t.getType().equals(TrainingType.GROUP)){
				groupTrainings.add(t);
			}
		}
		return groupTrainings;
	}
	
	public ArrayList<Training> getSortedTrainingsTrainer(TrainingSortDTO sortParameter) throws JsonSyntaxException, IOException{
		
		ArrayList<Training> sortedTrainings = sortParameter.getTrainings();

		if(sortParameter.getParameter().equals("price"))
			if(sortParameter.getMode().equals("asc"))
				sortedTrainings.sort((o1, o2) -> Integer.compare(o1.getPrice(), o2.getPrice()));
			if(sortParameter.getMode().equals("desc"))
				sortedTrainings.sort((o1, o2) -> Integer.compare(o2.getPrice(), o1.getPrice()));
		if(sortParameter.getParameter().equals("facility"))
			if(sortParameter.getMode().equals("asc"))
				sortedTrainings.sort((o1, o2)-> o1.getSportsFacility().compareTo(o2.getSportsFacility()));
			if(sortParameter.getMode().equals("desc"))
				sortedTrainings.sort((o1, o2)-> o2.getSportsFacility().compareTo(o1.getSportsFacility()));
		return sortedTrainings;
	}
	public ArrayList<Training> getSortedTrainingsCustomer(TrainingSortDTO sortParameter) throws JsonSyntaxException, IOException{
		
		ArrayList<Training> sortedTrainings = sortParameter.getTrainings();

		if(sortParameter.getParameter().equals("price"))
			if(sortParameter.getMode().equals("asc"))
				sortedTrainings.sort((o1, o2) -> Integer.compare(o1.getPrice(), o2.getPrice()));
			if(sortParameter.getMode().equals("desc"))
				sortedTrainings.sort((o1, o2) -> Integer.compare(o2.getPrice(), o1.getPrice()));
		if(sortParameter.getParameter().equals("facility"))
			if(sortParameter.getMode().equals("asc"))
				sortedTrainings.sort((o1, o2)-> o1.getSportsFacility().compareTo(o2.getSportsFacility()));
			if(sortParameter.getMode().equals("desc"))
				sortedTrainings.sort((o1, o2)-> o2.getSportsFacility().compareTo(o1.getSportsFacility()));
		return sortedTrainings;
	}
	
	public ArrayList<Training> getGymFacilityTrainingsTrainer(String trainerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getTrainerTrainings(trainerName);
		ArrayList<Training> gymTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			Facility facility = facilityService.getFacilityByName(t.getSportsFacility());			
			if(facility.getType().equals(FacilityType.GYM))
				{
					gymTrainings.add(t);
				}
		}
		
		return gymTrainings;
	}
	public ArrayList<Training> getPoolFacilityTrainingsTrainer(String trainerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getTrainerTrainings(trainerName);
		ArrayList<Training> poolTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			Facility facility = facilityService.getFacilityByName(t.getSportsFacility());			
			if(facility.getType().equals(FacilityType.POOL))
				{
					poolTrainings.add(t);
				}
		}
		
		return poolTrainings;
	}
	public ArrayList<Training> getDanceFacilityTrainingsTrainer(String trainerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getTrainerTrainings(trainerName);
		ArrayList<Training> danceTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			Facility facility = facilityService.getFacilityByName(t.getSportsFacility());			
			if(facility.getType().equals(FacilityType.DANCE_STUDIO))
				{
					danceTrainings.add(t);
				}
		}
		
		return danceTrainings;
	}
	public ArrayList<Training> getSportsFacilityTrainingsTrainer(String trainerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getTrainerTrainings(trainerName);
		ArrayList<Training> sportsTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			Facility facility = facilityService.getFacilityByName(t.getSportsFacility());			
			if(facility.getType().equals(FacilityType.SPORTS_FACILITY))
				{
					sportsTrainings.add(t);
				}
		}
		
		return sportsTrainings;
	}
	public ArrayList<Training> getGymFacilityTrainingsCustomer(String name) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getCustomerTrainings(name);
		ArrayList<Training> gymTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			Facility facility = facilityService.getFacilityByName(t.getSportsFacility());			
			if(facility.getType().equals(FacilityType.GYM))
				{
					gymTrainings.add(t);
				}
		}
		
		return gymTrainings;
	}
	public ArrayList<Training> getPoolFacilityTrainingsCustomer(String name) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getCustomerTrainings(name);
		ArrayList<Training> poolTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			Facility facility = facilityService.getFacilityByName(t.getSportsFacility());			
			if(facility.getType().equals(FacilityType.POOL))
				{
					poolTrainings.add(t);
				}
		}
		
		return poolTrainings;
	}
	public ArrayList<Training> getDanceFacilityTrainingsCustomer(String customerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getCustomerTrainings(customerName);
		ArrayList<Training> danceTrainings = new ArrayList<Training>();

		for(Training t : trainings) {
			Facility facility = facilityService.getFacilityByName(t.getSportsFacility());			
			if(facility.getType().equals(FacilityType.DANCE_STUDIO))
				{
					danceTrainings.add(t);
				}
		}
		
		return danceTrainings;
	}
	public ArrayList<Training> getSportsFacilityTrainingsCustomer(String name) throws JsonSyntaxException, IOException{
		ArrayList<Training> trainings = getCustomerTrainings(name);
		ArrayList<Training> sportsTrainings = new ArrayList<Training>();
		
		for(Training t : trainings) {
			Facility facility = facilityService.getFacilityByName(t.getSportsFacility());			
			if(facility.getType().equals(FacilityType.SPORTS_FACILITY))
				{
					sportsTrainings.add(t);
				}
		}
		
		return sportsTrainings;
	}
	
}
