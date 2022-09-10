package controllers;

import com.google.gson.Gson;

import beans.Facility;
import dto.FacilitySearchDTO;
import dto.FacilitySortDTO;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.ArrayList;

import services.FacilityService;

public class FacilityController {

	private FacilityService facilityService;
	private static Gson gson = new Gson();
	
	public FacilityController(FacilityService facilityService) {
		super();
		this.facilityService = facilityService;
		
		get("/facilities/getAll", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(facilityService.getAll());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("facility/:id", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(facilityService.getFacility(req.params("id")));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("oneFacility/", (req, res) -> {
			res.type("application/json");
			try {
				String name = req.queryParams("facilityName");
				return gson.toJson(facilityService.getFacility(name));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/facilities/getAllTypes", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(facilityService.getAllFacilityTypes());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/facilities/searchFacilities", (req, res) -> {
			res.type("aplication/json");
			try {
				FacilitySearchDTO searchParameters = gson.fromJson(req.body(), FacilitySearchDTO.class);
				ArrayList<Facility> facilities = facilityService.getSearchedFacilities(searchParameters);
				return gson.toJson(facilities);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		post("/facilities/sortFacilities", (req, res) -> {
				res.type("application/json");
				try {
					FacilitySortDTO sortParameters = gson.fromJson(req.body(), FacilitySortDTO.class);
					ArrayList<Facility> facilities = facilityService.getSortedFacilities(sortParameters);
					return gson.toJson(facilities);
					
				} catch(Exception e) {
					e.printStackTrace();
					return null;
				}
			
		});
		
		get("/facilities/openedFacilities", (req, res) -> {
			res.type("application/json");
			try {
				return gson.toJson(facilityService.getOpenedFacilities());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		post("/facility/addNewFacility", (req, res) -> {
			res.type("aplication/json");
			
			try {
				Facility newFacility = gson.fromJson(req.body(), Facility.class);
				
				for(Facility facility : facilityService.getAll()) {
					if(facility.getName().equals(newFacility.getName())) {
						return "";
					}
				}
				
				facilityService.createFacility(newFacility);
				return gson.toJson(newFacility);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		
		});
		
		post("/facilities/getOpenedFacilities", (req, res) -> {
			res.type("application/json");
			try {
				FacilitySortDTO sortParams = gson.fromJson(req.body(), FacilitySortDTO.class);
				ArrayList<Facility> facilities = facilityService.getAllOpend(sortParams);
				return gson.toJson(facilities);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

	}
	
	
}
