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
import beans.Trainer;

public class TrainerDAO implements IDao<Trainer, String>{
	
	private String path;
	public TrainerDAO(String path) {
		super();
		this.path = path;
	}

	@Override
	public ArrayList<Trainer> getAll() throws JsonSyntaxException, IOException {
		ArrayList<Trainer> Trainers = new Gson().fromJson((Files.readAllLines(Paths.get(path), 
				Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(path),
							Charset.defaultCharset()).get(0), 
					new TypeToken<List<Trainer>>(){}.getType());
		
		if(Trainers == null) {
			Trainers = new ArrayList<Trainer>();
		}
		
		return Trainers;
	}

	@Override
	public ArrayList<Trainer> getAllNonDeleted() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Trainer getByID(String id) throws JsonSyntaxException, IOException {
		Trainer wantedTrainer = null;
		ArrayList<Trainer> trainers = (ArrayList<Trainer>) getAll();
			for(Trainer trainer : trainers) {
				if(trainer.getUsername().equals(id)) {
					wantedTrainer = trainer;
					break;
			}
		}
		return wantedTrainer;
	}

	@Override
	public void create(Trainer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(Trainer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Trainer> trainers = getAll();
		for(Trainer trainer : trainers) {
			if(trainer.getUsername().equals(entity.getUsername())) {
				trainers.set(trainers.indexOf(trainer), entity);
				break;
			}
		}
		saveAll(trainers);
	}

	@Override
	public void delete(Trainer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(Trainer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void saveAll(ArrayList<Trainer> entities) throws FileNotFoundException {
		// TODO Auto-generated method stub
		PrintWriter writer = new PrintWriter(path);
		String allEntities = new Gson().toJson(entities, new TypeToken<List<Manager>>(){}.getType());
		writer.println(allEntities);
		writer.close();	
	}

}
