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

import beans.Trainer;
import beans.Training;
import beans.TrainingHistory;

public class TrainingHistoryDAO implements IDao<TrainingHistory, String>{

	private String path;
	
	public TrainingHistoryDAO(String path) {
		super();
		this.path = path;
	}
	
	@Override
	public ArrayList<TrainingHistory> getAll() throws JsonSyntaxException, IOException {
		ArrayList<TrainingHistory> Trainings = new Gson().fromJson((Files.readAllLines(Paths.get(path), 
				Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(path),
							Charset.defaultCharset()).get(0), 
					new TypeToken<List<TrainingHistory>>(){}.getType());
		
		if(Trainings == null) {
			Trainings = new ArrayList<TrainingHistory>();
		}
		
		return Trainings;
	}

	@Override
	public ArrayList<TrainingHistory> getAllNonDeleted() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TrainingHistory getByID(String id) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void create(TrainingHistory entity) throws JsonSyntaxException, IOException {
		ArrayList<TrainingHistory> Trainings = getAll();
		Trainings.add(entity);
		saveAll(Trainings);			
	}

	@Override
	public void update(TrainingHistory entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(TrainingHistory entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(TrainingHistory entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void saveAll(ArrayList<TrainingHistory> entities) throws FileNotFoundException {
		PrintWriter writer = new PrintWriter(path);
		String allEntities = new Gson().toJson(entities, new TypeToken<List<TrainingHistory>>(){}.getType());
		writer.println(allEntities);
		writer.close();		
	}

}
