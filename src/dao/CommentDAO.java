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

import beans.Comment;

public class CommentDAO implements IDao<Comment, Integer>{
	
	private String path;

	public CommentDAO(String path) {
		super();
		this.path = path;
	}

	@Override
	public ArrayList<Comment> getAll() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Comment> comments = new Gson().fromJson((Files.readAllLines(Paths.get(path), 
				Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(path),
							Charset.defaultCharset()).get(0), 
					new TypeToken<List<Comment>>(){}.getType());
		
		if(comments == null)
			comments = new ArrayList<Comment>();
			
		return comments;
	}

	@Override
	public ArrayList<Comment> getAllNonDeleted() throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Comment getByID(Integer id) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		Comment wantedComment = null;
		ArrayList<Comment> comments = (ArrayList<Comment>) getAll();
		if(comments.size()!=0)
		{
			for(Comment comment : comments) {
				if(comment.getId().equals(id)) {
					wantedComment = comment;
					break;
				}
			}
		}
		return wantedComment;
	}

	@Override
	public void create(Comment entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(Comment entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Comment> comments = getAll();
		for(Comment comment : comments) {
			if(comment.getId().equals(entity.getId())) {
				comments.set(comments.indexOf(comment), entity);
				break;
			}
		}
		saveAll(comments);
	}

	@Override
	public void delete(Comment entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save(Comment entity) throws JsonSyntaxException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Comment> comments = getAll();
		comments.add(entity);
		saveAll(comments);
		
	}

	@Override
	public void saveAll(ArrayList<Comment> entities) throws FileNotFoundException {
		// TODO Auto-generated method stub
		PrintWriter writer = new PrintWriter(path);
		String allEntities = new Gson().toJson(entities, new TypeToken<List<Comment>>(){}.getType());
		writer.println(allEntities);
		writer.close();
	}

	public ArrayList<Integer> getAllCommentsIDs() throws JsonSyntaxException, IOException{
		
		ArrayList<Integer> allIDs = new ArrayList<Integer>();
		ArrayList<Comment> allComments = getAll();
        for (Comment comment : allComments) 
        	allIDs.add(comment.getId());
        
        return allIDs;
    }
}
