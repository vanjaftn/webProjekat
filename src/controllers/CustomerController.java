package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import com.google.gson.Gson;

import beans.Customer;
import beans.Membership;
import beans.User;
import dto.MembershipDTO;
import services.CustomerService;
import spark.Session;


public class CustomerController {
	
	private CustomerService customerService;
	private static Gson gson = new Gson();
	
	public CustomerController(CustomerService customerService ) {
		super();
		this.customerService  = customerService ;
		
		get("/getCustomer", (req, res) -> {
			res.type("application/json");
			try {
				String jwt = req.queryParams("jwt");
				String customer = customerService.getCustomerByJwt(jwt);
				return customer;
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/customer/switchMembership", (req,res) -> {
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Customer customer = customerService.getCustomerByUsername(loggedUser.getUsername());
				
				MembershipDTO membershipParams = gson.fromJson(req.body(), MembershipDTO.class);
			

				Membership membership = customerService.createNewMembership(membershipParams, customer);				
				customerService.switchMembership(customer, membership);
				
				return gson.toJson(customer.getMembership());
//				return "";
			}catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("/customer/addNewMembership", (req,res) -> {
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Customer customer = customerService.getCustomerByUsername(loggedUser.getUsername());
				
				MembershipDTO membershipParams = gson.fromJson(req.body(), MembershipDTO.class);
			

				Membership membership = customerService.createNewMembership(membershipParams, customer);				
				customerService.addNewMembership(customer, membership);
				
				return gson.toJson(customer.getMembership());
//				return "";
			}catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/customer/getMembership", (req,res) -> {
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Customer customer = customerService.getCustomerByUsername(loggedUser.getUsername());
				return gson.toJson(customer.getMembership());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
					
		});
		
		get("/customer/getFacilityMembership/:id", (req,res) -> {
			res.type("application/json");
			try {
				Session session = req.session(true);
				User loggedUser = session.attribute("user");
				Customer customer = customerService.getCustomerByUsername(loggedUser.getUsername());
				Membership m = customerService.getMembershipByName(customer, req.params("id"));
				
				
				return m;
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
					
		});

	}

}
