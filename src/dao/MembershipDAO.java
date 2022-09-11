package dao;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.Membership;

public class MembershipDAO implements IDao<Membership, String>{

	private String path;
	
	public MembershipDAO(String path) {
		super();
		this.path = path;
	}

	@Override
	public ArrayList<Membership> getAll() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Membership> memberships = new Gson().fromJson((Files.readAllLines(Paths.get(path), 
				Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(path),
							Charset.defaultCharset()).get(0), 
					new TypeToken<List<Membership>>(){}.getType());
		
		if(memberships == null)
			memberships = new ArrayList<Membership>();
			
		return memberships;
	}

	@Override
	public ArrayList<Membership> getAllNonDeleted() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Membership getByID(String id) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void create(Membership entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(Membership entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(Membership entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(Membership entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void saveAll(ArrayList<Membership> entities) throws FileNotFoundException {
		// TODO Auto-generated method stub
		
	}

}
