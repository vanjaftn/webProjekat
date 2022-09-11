package beans;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

public class TrainingHistory implements Serializable{
	
	private LocalDateTime applicationDate;
	private String training;
	private String customer;
	private String trainer;
	private String id;
	
	
	public TrainingHistory(LocalDateTime applicationDate, String training, String customer, String trainer, String id) {
		super();
		this.applicationDate = applicationDate;
		this.training = training;
		this.customer = customer;
		this.trainer = trainer;
		this.id = id;
	}
	public LocalDateTime getApplicationDate() {
		return applicationDate;
	}
	public void setApplicationDate(LocalDateTime applicationDate) {
		this.applicationDate = applicationDate;
	}
	public String getTraining() {
		return training;
	}
	public void setTraining(String training) {
		this.training = training;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public String getTrainer() {
		return trainer;
	}
	public void setTrainer(String trainer) {
		this.trainer = trainer;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
	
	
}
