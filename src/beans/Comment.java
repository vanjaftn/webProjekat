package beans;

import java.io.Serializable;

public class Comment implements Serializable{

   private String content;
   private int grade;
   
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

}