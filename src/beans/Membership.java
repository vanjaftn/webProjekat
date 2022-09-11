package beans;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class Membership implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String name;
	private MembershipType type;
	private String paymentDate;
	private String expirationDate;
	private int price;
	private int appointmentNumber;
	private String description;
	private String facility;
	private String customer;
	private ArrayList<Training> trainings;
	
	public Membership(String id, String customer,int number, String facility) {
		this.id = id;
		this.customer = customer;
		this.appointmentNumber = number;
		this.facility = facility;
	}
	
	public Membership(String id,String name, MembershipType type, String paymentDate, String expirationDate, int price, 
			int appointmentNumber, String description, String facility) {
		super();
		this.name=name;
		this.id = id;
		this.type = type;
		this.paymentDate =  paymentDate;
		this.expirationDate = expirationDate;
		this.price = price;
		this.appointmentNumber = appointmentNumber;
		this.description = description;
		this.facility = facility;
	}



	public String getId() {
		return id;
	}

	public MembershipType getType() {
		return type;
	}

	public String getPaymentDate() {
		return paymentDate;
	}

	public String getExpirationDate() {
		return expirationDate;
	}

	public int getPrice() {
		return price;
	}

	public int getAppointmentNumber() {
		return appointmentNumber;
	}

	public String getDescription() {
		return description;
	}

	public String getFacility() {
		return facility;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setType(MembershipType type) {
		this.type = type;
	}

	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}

	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public void setAppointmentNumber(int appointmentNumber) {
		this.appointmentNumber = appointmentNumber;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setFacility(String facility) {
		this.facility = facility;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getCustomer() {
		return customer;
	}



	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public ArrayList<Training> getTrainings() {
		return trainings;
	}

	public void setTrainings(ArrayList<Training> trainings) {
		this.trainings = trainings;
	}



	
	
	
	
}
