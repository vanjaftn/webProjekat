package services;

import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Customer;
import dao.CustomerDAO;

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
	
	

}
