package beans;

import java.io.Serializable;

public class Manager extends User implements Serializable{

   /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String facility;

	public Manager(String facility) {
	super();
	this.facility = facility;
}

	public String getFacility() {
		return facility;
	}
	
	public void setFacility(String facility) {
		this.facility = facility;
	}

}