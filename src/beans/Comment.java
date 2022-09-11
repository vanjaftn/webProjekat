package beans;

import java.io.Serializable;

public class Comment implements Serializable{

   private String content;
   private int grade;
   private Integer id;
   private String user;
   private String facility;
   private CommentsStatus status;
   
   private Membership membership;

	public Comment() {
		super();
	}

	public Comment(String content, int grade, Membership membership) {
		super();
		this.content = content;
		this.grade = grade;
		this.membership = membership;
	}
	
	public Comment(int id, String user, String facility, String content,int grade, CommentsStatus status) {
		super();
		this.content = content;
		this.grade = grade;
		this.id = id;
		this.user = user;
		this.facility = facility;
		this.status = status;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public Membership getOrder() {
		return membership;
	}

	public void setOrder(Membership membership) {
		this.membership = membership;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getFacility() {
		return facility;
	}

	public void setFacility(String facility) {
		this.facility = facility;
	}

	public CommentsStatus getStatus() {
		return status;
	}

	public void setStatus(CommentsStatus status) {
		this.status = status;
	}

}