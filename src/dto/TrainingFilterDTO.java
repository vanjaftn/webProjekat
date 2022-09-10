package dto;

import java.util.ArrayList;

import beans.Training;

public class TrainingFilterDTO {
	
	private String filter;
	private String trainer;
	
	public String getTrainer() {
		return trainer;
	}
	public void setTrainer(String trainer) {
		this.trainer = trainer;
	}
	public String getFilter() {
		return filter;
	}
	public void setFilter(String filter) {
		this.filter = filter;
	}
	
	

}
