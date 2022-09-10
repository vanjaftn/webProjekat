package beans;

import java.io.Serializable;

public class Manager extends User implements Serializable {

	private String facility;
	private Boolean isDeleted;

	public String getFacility() {
		return facility;
	}

	public void setFacility(String facility) {
		this.facility = facility;
	}

	public Boolean isDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

}