package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.Manager;
import dao.ManagerDAO;

public class ManagerService {

	private ManagerDAO managerDAO;
	private UserService userService;
	private static Gson gson = new Gson();

	public ManagerService(ManagerDAO managerDAO) {
		super();
		this.managerDAO = managerDAO;
	}
	
	public void createManager(Manager manager) throws JsonSyntaxException, IOException {
		managerDAO.create(manager);
	}
	
	public ArrayList<Manager> getAllManagers() throws JsonSyntaxException, IOException{
		return managerDAO.getAllNonDeleted();
	}
	
	public ArrayList<Manager> getAllManagersWithoutFacility() throws JsonSyntaxException, IOException{
		ArrayList<Manager> managers = getAllManagers();
		ArrayList<Manager> managersWithoutFacility = new ArrayList<Manager>();
		
		for (Manager manager : managers) 
			if(manager.getFacility() == null) 
				managersWithoutFacility.add(manager);
		
		return (managersWithoutFacility.size() > 0) ?  managersWithoutFacility :  null;
	}
	
	public Manager getManagerByUserName(String username) throws JsonSyntaxException, IOException {
		return managerDAO.getByID(username);
	}
	

	public String getManager(String jwt) throws JsonSyntaxException, IOException{
		String username = userService.getUsernameFromJWT(jwt);
		
			return gson.toJson(getManagerByUserName(username));
		
	}
	
	public void updateManager(Manager manager) throws JsonSyntaxException, IOException {
		this.managerDAO.update(manager);
	}
}
