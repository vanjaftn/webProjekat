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

import beans.Customer;
import beans.Facility;
import beans.Trainer;

public class CustomerDAO implements IDao<Customer, String> {

	private String path;
	
	public CustomerDAO(String path) {
		super();
		this.path = path;
	}
	@Override
	public ArrayList<Customer> getAll() throws JsonSyntaxException, IOException {
		ArrayList<Customer> Customers = new Gson().fromJson((Files.readAllLines(Paths.get(path),
				Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(path),
							Charset.defaultCharset()).get(0),
					new TypeToken<List<Customer>>(){}.getType());
		if(Customers == null)
			Customers = new ArrayList<Customer>();
		
		return Customers;
	}

	@Override
	public ArrayList<Customer> getAllNonDeleted() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Customer getByID(String id) throws JsonSyntaxException, IOException {
		Customer wantedCustomer = null;
		ArrayList<Customer> customers = (ArrayList<Customer>) getAll();
			for(Customer customer : customers) {
				if(customer.getUsername().equals(id)) {
					wantedCustomer = customer;
					break;
			}
		}
		return wantedCustomer;
	}

	@Override
	public void create(Customer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(Customer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(Customer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(Customer entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void saveAll(ArrayList<Customer> entities) throws FileNotFoundException {
		// TODO Auto-generated method stub
		
	}

}
