package dto;

import beans.CommentsStatus;

public class CommentDTO {

	private String user;
	private String facility;
	private String content;
	private int grade;
	private CommentsStatus status;
	
	public CommentDTO(String user, String facility, String content, int grade, CommentsStatus status) {
		super();
		this.user = user;
		this.facility = facility;
		this.content = content;
		this.grade = grade;
		this.status = status;
	}

	public String getUser() {
		return user;
	}

	public String getFacility() {
		return facility;
	}

	public String getContent() {
		return content;
	}

	public int getGrade() {
		return grade;
	}

	public CommentsStatus getStatus() {
		return status;
	}	
	
}
