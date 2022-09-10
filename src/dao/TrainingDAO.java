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

import beans.Training;

public class TrainingDAO implements IDao<Training, String>{
	
	private String path;
	
	public TrainingDAO(String path) {
		super();
		this.path = path;
	}

	@Override
	public ArrayList<Training> getAll() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Training> Trainings = new Gson().fromJson((Files.readAllLines(Paths.get(path), 
				Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(path),
							Charset.defaultCharset()).get(0), 
					new TypeToken<List<Training>>(){}.getType());
		
		if(Trainings == null) {
			Trainings = new ArrayList<Training>();
		}
		
		return Trainings;
	}

	@Override
	public ArrayList<Training> getAllNonDeleted() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Training> allTraining = getAll();
		ArrayList<Training> nonDeleted = new ArrayList<Training>();
		
		for (Training Training : allTraining) 
			if(!Training.isDeleted())
				nonDeleted.add(Training);
		
		return nonDeleted;
	}

	@Override
	public Training getByID(String id) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		Training wantedTraining = null;
		ArrayList<Training> Trainings = (ArrayList<Training>) getAll();
		if(Trainings.size()!=0)
		{
			for(Training Training : Trainings) {
				if(Training.getName().equals(id)) {
					wantedTraining = Training;
					break;
				}
			}
		}
		return wantedTraining;
	}

	@Override
	public void create(Training entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Training> Trainings = getAll();
		Trainings.add(entity);
		saveAll(Trainings);	
	}

	@Override
	public void update(Training entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Training> Trainings = getAll();
		for(Training Training : Trainings) {
			if(Training.getName().equals(entity.getName())) {
				Trainings.set(Trainings.indexOf(Training), entity);
				break;
			}
		}
		saveAll(Trainings);
	}

	@Override
	public void delete(Training entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(Training entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Training> Trainings = getAll();
		Trainings.add(entity);
		saveAll(Trainings);
	}

	@Override
	public void saveAll(ArrayList<Training> entities) throws FileNotFoundException {
		// TODO Auto-generated method stub
		PrintWriter writer = new PrintWriter(path);
		String allEntities = new Gson().toJson(entities, new TypeToken<List<Training>>(){}.getType());
		writer.println(allEntities);
		writer.close();	
	}
	


}
