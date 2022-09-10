package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Customer;
import beans.Facility;
import beans.FacilityType;
import beans.Training;
import beans.TrainingType;
import dao.FacilityDAO;
import dao.TrainingDAO;
import dto.TrainingSortDTO;

public class TrainingService {
	private TrainingDAO trainingDAO;
	private ImportImage decoder = new ImportImage();
	private static Gson gson = new Gson();
	private FacilityDAO facilityDAO = new FacilityDAO("./data/facilities.json");
	private FacilityService facilityService = new FacilityService(facilityDAO);
	
	public TrainingService(TrainingDAO trainingDAO) {
		super();
		this.trainingDAO = trainingDAO;
	}
	
	public String getTrainingTypes() throws JsonSyntaxException, IOException{
		ArrayList<TrainingType> types = new ArrayList<TrainingType>(Arrays.asList(TrainingType.values()));
		return gson.toJson(types);
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
	public ArrayList<Training> getCustomerTrainings(String CustomerName)throws JsonSyntaxException, IOException{
		
		ArrayList<Training> trainings = trainingDAO.getAll();
		ArrayList<Training> customerTrainings = new ArrayList<Training>();

		for(Training t : trainings) {
				if(t.getCustomers().equals(CustomerName))
				customerTrainings.add(t);
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
	
	public ArrayList<Training> getTrainingsSortedByPriceAsc(String facility) throws JsonSyntaxException, IOException{
		ArrayList<Training> sortedTrainings = getFacilityTrainings(facility);
		
		sortedTrainings.sort((o1, o2) -> Integer.compare(o1.getPrice(), o2.getPrice()));
		return sortedTrainings;
	}

	public ArrayList<Training> getTrainingsSortedByPriceDesc(String facility) throws JsonSyntaxException, IOException{
		ArrayList<Training> sortedTrainings = getFacilityTrainings(facility);
		
		sortedTrainings.sort((o1, o2) -> Integer.compare(o2.getPrice(), o1.getPrice()));
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
	
	public ArrayList<Training> getTrainingsSortedByPriceAscCustomer(String customerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> sortedTrainings = getCustomerTrainings(customerName);
		
		sortedTrainings.sort((o1, o2) -> Integer.compare(o1.getPrice(), o2.getPrice()));
		return sortedTrainings;
	}

	public ArrayList<Training> getTrainingsSortedByPriceDescCustomer(String customerName) throws JsonSyntaxException, IOException{
		ArrayList<Training> sortedTrainings = getCustomerTrainings(customerName);
		
		sortedTrainings.sort((o1, o2) -> Integer.compare(o2.getPrice(), o1.getPrice()));
		return sortedTrainings;
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
	
	public ArrayList<Training> getSortedTrainings(TrainingSortDTO sortParameter) throws JsonSyntaxException, IOException{
		ArrayList<Training> sortedTrainings = getTrainerTrainings(sortParameter.getTrainerName());

		if(sortParameter.getParameter().equals("price"))
			if(sortParameter.getMode().equals("asc"))
				sortedTrainings.sort((o1, o2) -> Integer.compare(o1.getPrice(), o2.getPrice()));
			if(sortParameter.getMode().equals("desc"))
				sortedTrainings.sort((o1, o2) -> Integer.compare(o2.getPrice(), o1.getPrice()));
		if(sortParameter.getParameter().equals("facilityType"))
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
			if(facility.getType().equals("Gym"))
				{
					gymTrainings.add(t);
				}
		}
		
		return gymTrainings;
	}
	
}