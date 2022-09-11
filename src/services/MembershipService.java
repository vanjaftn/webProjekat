package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Facility;
import beans.Membership;
import dao.MembershipDAO;

public class MembershipService {

	private MembershipDAO membershipDAO;
	private ImportImage decoder = new ImportImage();
	
	public MembershipService(MembershipDAO membershipDAO) {
		super();
		this.membershipDAO = membershipDAO;
	}
	
	public ArrayList<Membership> getAll() throws JsonSyntaxException, IOException{
		return membershipDAO.getAll();
	}

	public ArrayList<Membership> getAllFacilityMemberships(String facilityName) throws JsonSyntaxException, IOException{
		ArrayList<Membership> facilityMemberships = new ArrayList<Membership>();
		for(Membership m : membershipDAO.getAll()) {
			if(m.getFacility().equals(facilityName)) {
				facilityMemberships.add(m);
			}
		}
		return facilityMemberships;
	}
	
	
	
}
