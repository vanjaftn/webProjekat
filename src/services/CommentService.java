package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.Comment;
import beans.CommentsStatus;
import controllers.FacilityController;
import dao.CommentDAO;
import dto.CommentDTO;

public class CommentService {

	private CommentDAO commentDAO;

	public CommentService(CommentDAO commentDAO) {
		super();
		this.commentDAO = commentDAO;
	}
	
	public ArrayList<Comment> getAllComments() throws JsonSyntaxException, IOException {
		return commentDAO.getAll();
	}
	
	public void approveComment(int id) throws JsonSyntaxException, IOException {
		Comment comment = commentDAO.getByID(id);
		comment.setStatus(CommentsStatus.APPROVED);
		commentDAO.update(comment);
		double commentCount = 0.0;
		double grades = 0.0;
		for(Comment c : commentDAO.getAll()) {
			if(c.getFacility().equals(comment.getFacility()) && c.getStatus().equals(CommentsStatus.APPROVED)) {
				commentCount++;
				grades += c.getGrade();
			}
		}
		double newGrade = grades/commentCount;
		FacilityController.facilityService.updateFacilityGrade(comment.getFacility(), newGrade);
	}
	
	public void rejectComment(int i)throws JsonSyntaxException, IOException {
		Comment comment = commentDAO.getByID(i);
		comment.setStatus(CommentsStatus.REJECTED);
		commentDAO.update(comment);
	}
	
	public ArrayList<Comment> getApprovedFacilityComments(String facility) throws JsonSyntaxException, IOException {
		ArrayList<Comment> approvedComments = new ArrayList<Comment>();
		for(Comment comment : commentDAO.getAll()) {
			if(comment.getFacility().equals(facility) && comment.getStatus().equals(CommentsStatus.APPROVED))
				approvedComments.add(comment);
		}
		
		return approvedComments;
	}
	
	public Comment createNewComment(CommentDTO commentParams) throws JsonSyntaxException, IOException {
		Comment newComment = new Comment(generateCommentID(), commentParams.getUser(), commentParams.getFacility(), commentParams.getContent(), commentParams.getGrade(), commentParams.getStatus());
		commentDAO.save(newComment);
		return newComment;
	}
	
	private Integer generateCommentID() throws JsonSyntaxException, IOException {
		ArrayList<Integer> allIDs = commentDAO.getAllCommentsIDs();
        int id = 1;
        while (true)
        {
            if (!allIDs.contains(id))
                break;

            id += 1;
        }
        return id;
	}
	
	public ArrayList<Comment> getRejectedFacilityComments(String facility) throws JsonSyntaxException, IOException {
		ArrayList<Comment> approvedComments = new ArrayList<Comment>();
		for(Comment comment : commentDAO.getAll()) {
			if(comment.getFacility().equals(facility) && comment.getStatus().equals(CommentsStatus.REJECTED))
				approvedComments.add(comment);
		}
		
		return approvedComments;
	}
	
	public ArrayList<Comment> getCommentsManager(String facility) throws JsonSyntaxException, IOException {
		ArrayList<Comment> comments = new ArrayList<Comment>();
		comments.addAll(getApprovedFacilityComments(facility));
		comments.addAll(getRejectedFacilityComments(facility));
		
		return comments;
	}
}
