package beans;

import java.io.Serializable;
import java.util.ArrayList;

public class Training implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String name;
	private TrainingType type;
	private String description;
	private String picture;
	private String sportsFacility;
	private int duration;
	private String trainer;
	private int price;
	private String customers;
	
	public String getCustomers() {
		return customers;
	}
	public void setCustomers(String customers) {
		this.customers = customers;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	private Boolean isDeleted;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public TrainingType getType() {
		return type;
	}
	public void setType(TrainingType type) {
		this.type = type;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getSportsFacility() {
		return sportsFacility;
	}
	public void setSportsFacility(String sportsFacility) {
		this.sportsFacility = sportsFacility;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public String getTrainer() {
		return trainer;
	}
	public void setTrainer(String trainer) {
		this.trainer = trainer;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public Boolean isDeleted() {
		return isDeleted;
	}
	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	
}
