package dto;

import java.util.ArrayList;

import beans.Training;

public class TrainingSearchDTO {
	
	private String name;
	private ArrayList<Training> trainings;

	public ArrayList<Training> getTrainings() {
		return trainings;
	}

	public void setTrainings(ArrayList<Training> trainings) {
		this.trainings = trainings;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
