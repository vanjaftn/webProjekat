package beans;

import java.io.Serializable;
import java.util.*;


public class Customer extends User implements Serializable{
	
   private double points;
   private CustomerType customerType;
   private ArrayList<Membership> membership;
   private ArrayList<Training> trainings;
   
public Customer(double points, CustomerType customerType, ArrayList<Membership> membership, ArrayList<Training> trainings) {
	super();
	this.points = points;
	this.customerType = customerType;
	this.membership = membership;
	this.trainings = trainings;
}

public double getPoints() {
	return points;
}

public CustomerType getCustomerType() {
	return customerType;
}

public ArrayList<Membership> getMembership() {
	return membership;
}

public ArrayList<Training> getTrainings() {
	return trainings;
}

public void setPoints(double points) {
	this.points = points;
}

public void setCustomerType(CustomerType customerType) {
	this.customerType = customerType;
}

public void setMembership(ArrayList<Membership> membership) {
	this.membership = membership;
}

public void setTrainings(ArrayList<Training> trainings) {
	this.trainings = trainings;
}
   
   
   
}