package dao;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.Manager;
import beans.User;

public class ManagerDAO implements IDao<Manager, String>{
	
	private String path;
	
	public ManagerDAO(String path) {
		super();
		this.path = path;
	}

	@Override
	public ArrayList<Manager> getAll() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Manager> managers = new Gson().fromJson((Files.readAllLines(Paths.get(path), 
				Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(path),
							Charset.defaultCharset()).get(0), 
					new TypeToken<List<Manager>>(){}.getType());
		
		if(managers == null) {
			managers = new ArrayList<Manager>();
		}
		
		return managers;
	}

	@Override
	public ArrayList<Manager> getAllNonDeleted() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Manager> allManager = getAll();
		ArrayList<Manager> nonDeleted = new ArrayList<Manager>();
		
		for (Manager manager : allManager) 
			if(!manager.isDeleted())
				nonDeleted.add(manager);
		
		return nonDeleted;
	}

	@Override
	public Manager getByID(String id) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		Manager wantedManager = null;
		ArrayList<Manager> managers = (ArrayList<Manager>) getAll();
		if(managers.size()!=0)
		{
			for(Manager manager : managers) {
				if(manager.getUsername().equals(id)) {
					wantedManager = manager;
					break;
				}
			}
		}
		return wantedManager;
	}

	@Override
	public void create(Manager entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Manager> managers = getAll();
		managers.add(entity);
		saveAll(managers);	
	}

	@Override
	public void update(Manager entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Manager> managers = getAll();
		for(Manager manager : managers) {
			if(manager.getUsername().equals(entity.getUsername())) {
				managers.set(managers.indexOf(manager), entity);
				break;
			}
		}
		saveAll(managers);
	}

	@Override
	public void delete(Manager entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(Manager entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Manager> managers = getAll();
		managers.add(entity);
		saveAll(managers);
	}

	@Override
	public void saveAll(ArrayList<Manager> entities) throws FileNotFoundException {
		// TODO Auto-generated method stub
		PrintWriter writer = new PrintWriter(path);
		String allEntities = new Gson().toJson(entities, new TypeToken<List<Manager>>(){}.getType());
		writer.println(allEntities);
		writer.close();	
	}


}
