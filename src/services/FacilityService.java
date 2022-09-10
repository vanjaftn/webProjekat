package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Facility;
import beans.FacilityStatus;
import dao.FacilityDAO;
import dto.FacilitySearchDTO;
import dto.FacilitySortDTO;

public class FacilityService {

	private FacilityDAO facilityDAO;
	private ImportImage decoder = new ImportImage();
	
	public FacilityService(FacilityDAO facilityDAO) {
		super();
		this.facilityDAO = facilityDAO;
	}
	
	public ArrayList<Facility> getAll() throws JsonSyntaxException, IOException{
		ArrayList<Facility> allFacilities = new ArrayList<Facility>();
		allFacilities.addAll(getOpenedFacilities());
		allFacilities.addAll(getClosedFacilities());
		return allFacilities;
	}
	
	public ArrayList<Facility> getSortedFacilities(FacilitySortDTO sortParameters) throws JsonSyntaxException, IOException {
		ArrayList<Facility> sortedFacilities = sortParameters.getFacilities();
		
		if(sortParameters.getParameter().equals("name"))
			if(sortParameters.getMode().equals("asc"))
				sortedFacilities.sort((o1, o2)-> o1.getName().compareTo( o2.getName()));
			else
				sortedFacilities.sort((o1, o2)-> o2.getName().compareTo( o1.getName()));
		else if(sortParameters.getParameter().equals("location"))
			if(sortParameters.getMode().equals("asc"))
				sortedFacilities.sort((o1, o2)-> o1.getLocation().toString().compareTo( o2.getLocation().toString()));		
			else
				sortedFacilities.sort((o1, o2)-> o2.getLocation().toString().compareTo( o1.getLocation().toString()));		
		else if(sortParameters.getParameter().equals("rating"))
			if(sortParameters.getMode().equals("asc"))
				sortedFacilities.sort((o1, o2) -> Double.compare(o1.getRating(), o2.getRating()));
			else
				sortedFacilities.sort((o1, o2) -> Double.compare(o2.getRating(), o1.getRating()));
		return sortedFacilities;
	}
	
	public Facility getFacility(String id) throws JsonSyntaxException, IOException{
		return facilityDAO.getByID(id);
	}
	
	public ArrayList<String> getAllFacilityTypes() throws JsonSyntaxException, IOException{
		ArrayList<String> allFacilityTypes = new ArrayList<String>();
		
		for (Facility facility : getAll())
			if(!allFacilityTypes.contains(facility.getType()))
				allFacilityTypes.add(facility.getType());
				
		return allFacilityTypes;
	}
	
	public ArrayList<Facility> getSearchedFacilities(FacilitySearchDTO searchParameters) throws JsonSyntaxException, IOException{
		ArrayList<Facility> allFacilities = searchParameters.getFacilities();
		ArrayList<Facility> searchedFacilities = new ArrayList<Facility>();
	
		if (!searchParameters.getName().trim().isEmpty()) {
			searchedFacilities.clear();
			for (Facility facility : allFacilities) {
				if (facility.getName().toLowerCase().contains(searchParameters.getName().toLowerCase()))
					searchedFacilities.add(facility);
			}
			
			allFacilities.clear();
			allFacilities.addAll(searchedFacilities);
		}
		
		if(!searchParameters.getLocation().trim().isEmpty()) {
			searchedFacilities.clear();
			for (Facility facility : allFacilities) {
				if (facility.getLocation().toString().toLowerCase().contains(searchParameters.getLocation().toLowerCase().trim()))
					searchedFacilities.add(facility);
			}
			
			allFacilities.clear();
			allFacilities.addAll(searchedFacilities);
		}
		
		if(!searchParameters.getType().trim().isEmpty()) {
			searchedFacilities.clear();
			for (Facility facility : allFacilities) {
				String typeRest = facility.getType().toString();
				if (typeRest.toLowerCase().contains(searchParameters.getType().toLowerCase().trim()))
					searchedFacilities.add(facility);
			}
			
			allFacilities.clear();
			allFacilities.addAll(searchedFacilities);
		}
		
		if(!searchParameters.getGrade().trim().isEmpty()) {
			int gradeFilter = Integer.parseInt(searchParameters.getGrade());
			double minGrade = (gradeFilter == 1) ? 1. : gradeFilter - 0.5;
			double maxGrade = (gradeFilter == 5) ? 5. : gradeFilter + 0.5;

			searchedFacilities.clear();
			for (Facility facility : allFacilities) {
				if (facility.getRating() >= minGrade && facility.getRating() <= maxGrade)
					searchedFacilities.add(facility);
			}
			
			allFacilities.clear();
			allFacilities.addAll(searchedFacilities);
		}
		
		return searchedFacilities;
	}
	
	public ArrayList<Facility> getOpenedFacilities() throws JsonSyntaxException, IOException {
		ArrayList<Facility> openedFacilities = new ArrayList<Facility>();
		for(Facility facility : facilityDAO.getAllNonDeleted())
			if(facility.getStatus().equals(FacilityStatus.OPEN))
				openedFacilities.add(facility);
		return openedFacilities;
	}
	
	public ArrayList<Facility> getClosedFacilities() throws JsonSyntaxException, IOException {
		ArrayList<Facility> closedFacilities = new ArrayList<Facility>();
		for(Facility facility : facilityDAO.getAllNonDeleted())
			if(facility.getStatus().equals(FacilityStatus.CLOSED))
				closedFacilities.add(facility);
		return closedFacilities;
	}
	
	public void createFacility(Facility facility) throws JsonSyntaxException, IOException{
		String path = "images/" + facility.getName() + ".jpg";
		decoder.ImportImage(facility.getImage(), path);
		path = "./" + "images/" + facility.getName() + ".jpg"; 
		facility.setImage(path);		
		facilityDAO.create(facility);
	}
	
	public Facility getFacilityByName(String facilityName) throws JsonSyntaxException, IOException{
		return facilityDAO.getByID(facilityName);
	}	
	
	public void updateFacilityGrade(String facilityName, double newGrade) throws JsonSyntaxException, IOException {
		Facility facility = facilityDAO.getByID(facilityName);
		facility.setRating(newGrade);
		facilityDAO.update(facility);
	}
	
	public ArrayList<Facility> getAllOpend(FacilitySortDTO sortParams) throws JsonSyntaxException, IOException {
		ArrayList<Facility> openedFacilities = new ArrayList<Facility>();
		for(Facility facility : sortParams.getFacilities()) {
			if(facility.getStatus().equals(FacilityStatus.OPEN)) {
				openedFacilities.add(facility);
			}
		}
		return openedFacilities;
	}
	
}
