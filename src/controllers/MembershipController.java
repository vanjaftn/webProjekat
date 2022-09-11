package controllers;

import com.google.gson.Gson;
import static spark.Spark.get;
import static spark.Spark.post;
import services.MembershipService;

public class MembershipController {

	private MembershipService membershipService;
	private static Gson gson = new Gson();
	
	
	public MembershipController(MembershipService membershipService) {
		super();
		this.membershipService = membershipService;
		
		get("/memberships/getFacilityMemberships/:id", (req,res) -> {
			res.type("application/json");
			try {
				return gson.toJson(membershipService.getAllFacilityMemberships(req.params("id")));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		}); 
	}
}
