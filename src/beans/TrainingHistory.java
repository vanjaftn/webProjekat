package beans;

import java.io.Serializable;
import java.util.Date;

public class TrainingHistory implements Serializable{
	
	private Date applicationDate;
	private String training;
	private String customer;
	private String trainer;
	private String id;
	
	public Date getApplicationDate() {
		return applicationDate;
	}
	public void setApplicationDate(Date applicationDate) {
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
