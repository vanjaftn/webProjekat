package beans;

import java.io.Serializable;
import java.util.*;


public class Customer extends User implements Serializable{
	
   private int points;
   private CustomerType customerType;
   private Membership membership;
   
public int getPoints() {
	return points;
}
public void setPoints(int points) {
	this.points = points;
}
public CustomerType getCustomerType() {
	return customerType;
}
public void setCustomerType(CustomerType customerType) {
	this.customerType = customerType;
}
public Membership getMembership() {
	return membership;
}
public void setMembership(Membership membership) {
	this.membership = membership;
}
   
}