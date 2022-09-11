package controllers;

import com.google.gson.Gson;

import beans.Comment;
import dto.CommentDTO;

import static spark.Spark.get;
import static spark.Spark.put;
import static spark.Spark.post;

import java.util.ArrayList;

import services.CommentService;

public class CommentController {

	private CommentService commentService;
	private static Gson gson = new Gson();
	
	public CommentController(CommentService commentService) {
		super();
		this.commentService = commentService;
		
		get("/comments/allComments/", (req,res) -> {
			res.type("application/json");
			try {
				ArrayList<Comment> comments = commentService.getAllComments();
				return gson.toJson(comments);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		put("/comment/approveComment/:id", (req,res) -> {
			res.type("application/json");
			
			try {
				commentService.approveComment(Integer.parseInt(req.params("id")));
				return gson.toJson(commentService.getAllComments());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		put("/comment/rejectComment/:id", (req,res) -> {
			res.type("application/json");
			
			try {
				commentService.rejectComment(Integer.parseInt(req.params("id")));
				return gson.toJson(commentService.getAllComments());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/comments/getApprovedComments/:id", (req, res) -> {
			res.type("application/json");
			try {
				ArrayList<Comment> comments = commentService.getApprovedFacilityComments(req.params("id"));
				return gson.toJson(comments);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/comment/add/", (req,res) -> {
			res.type("application/json");
			
			try {
				CommentDTO commentParams = gson.fromJson(req.body(), CommentDTO.class);
				Comment newComment = commentService.createNewComment(commentParams);	
				
				return newComment;
				
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
	}
	
	
}
