package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Customer;
import beans.Manager;
import beans.Membership;
import dao.CustomerDAO;
import dto.MembershipDTO;

public class CustomerService {
	
	private CustomerDAO customerDAO;
	private UserService userService;
	private static Gson gson = new Gson();
	
	public CustomerService(CustomerDAO customerDAO) {
		super();
		this.customerDAO = customerDAO;
	}
	
	public Customer getCustomerByUsername(String username) throws JsonSyntaxException, IOException  {
		return customerDAO.getByID(username);
	}
	
	public String getCustomerByJwt(String jwt)throws JsonSyntaxException, IOException  {
		String username = userService.getUsernameFromJWT(jwt);
		String customer = gson.toJson(getCustomerByUsername(username));
		return customer;
	}
	
	public void updateCustomer(Customer customer)throws JsonSyntaxException, IOException {
		customerDAO.update(customer);
	}
	
	public Membership createNewMembership(MembershipDTO membershipParams, Customer customer)throws JsonSyntaxException, IOException {
	
	
		return new Membership(membershipParams.getName(), customer.getUsername(), membershipParams.getAppointmentNumbers(), membershipParams.getFacility());
	}
	
	public Customer switchMembership(Customer customer, Membership membersip)throws JsonSyntaxException, IOException {
	//	customer.getMembership().getTrainings().clear();
//		customer.getMembership().setAppointmentNumber(0);
//		double points = customer.getPoints();
		
//		customer.setMembership(membersip);
		
		for(int m = 0; m < customer.getMembership().size(); m++) {
			if(customer.getMembership().get(m).getFacility().equals(membersip.getFacility())) {
				customer.getMembership().get(m).setId(membersip.getId());
				customer.getMembership().get(m).setAppointmentNumber(membersip.getAppointmentNumber());
				customer.getMembership().get(m).setPrice(membersip.getPrice());
				System.out.println("ovde");
				break;
			}
		}
		updateCustomer(customer);
		return customer;
	}
	
	public Customer addNewMembership(Customer customer, Membership membersip)throws JsonSyntaxException, IOException {
		customer.getMembership().add(membersip);
		updateCustomer(customer);
		return customer;
	}	
	
	public Membership getMembershipByName(Customer customer, String facilityName)throws JsonSyntaxException, IOException {
		Membership membership = null;
		
		for(Membership m : customer.getMembership()) {
			if(m.getFacility().equals(facilityName)) {
				membership=m;
				break;
			}
		}
		
		return membership;
	}
	
	public void createCustomer(Customer manager) throws JsonSyntaxException, IOException {
		customerDAO.create(manager);
	}

	public ArrayList<Customer> getAllCustomers() throws JsonSyntaxException, IOException{
		return customerDAO.getAllNonDeleted();
	}

}
