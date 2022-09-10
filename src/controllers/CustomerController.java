package controllers;

import static spark.Spark.get;

import com.google.gson.Gson;

import services.CustomerService;

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
	}

}
