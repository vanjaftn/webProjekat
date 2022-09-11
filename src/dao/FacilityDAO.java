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

import beans.Facility;
import beans.User;

public class FacilityDAO implements IDao<Facility, String>{

	private String path;
	
	public FacilityDAO(String path) {
		super();
		this.path = path;
	}
	
	@Override
	public ArrayList<Facility> getAll() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Facility> facilities = new Gson().fromJson((Files.readAllLines(Paths.get(path),
				Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(path),
							Charset.defaultCharset()).get(0),
					new TypeToken<List<Facility>>(){}.getType());
		if(facilities == null)
			facilities = new ArrayList<Facility>();
		
		return facilities;
	}

	@Override
	public ArrayList<Facility> getAllNonDeleted() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Facility> allFacilities = getAll();
		ArrayList<Facility> nonDeleted = new ArrayList<Facility>();
		
		for (Facility facility : allFacilities)
			if(!facility.isDeleted())
				nonDeleted.add(facility);
		
		return nonDeleted;
	}

	@Override
	public Facility getByID(String id) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Facility> facilities = getAll();
		for (Facility facility : facilities) {
			if (facility.getName().equals(id)) 
				return facility;
		}
		
		return null;
			
	}

	@Override
	public void create(Facility entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Facility> facilities = getAll();
		facilities.add(entity);
		saveAll(facilities);
		
	}

	@Override
	public void update(Facility entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Facility> facilities = getAll();
		for(Facility facility : facilities) {
			if(facility.getName().equals(entity.getName())) {
				facilities.set(facilities.indexOf(facility), entity);
				break;
			}
		}
		saveAll(facilities);
	}

	@Override
	public void delete(Facility entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(Facility entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void saveAll(ArrayList<Facility> entities) throws FileNotFoundException {
		// TODO Auto-generated method stub
		PrintWriter writer = new PrintWriter(path);
		String allEntities = new Gson().toJson(entities, new TypeToken<List<Facility>>(){}.getType());
		writer.println(allEntities);
		writer.close();
	}

	
}
