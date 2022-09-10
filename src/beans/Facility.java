package beans;

import java.io.Serializable;
import java.util.ArrayList;

public class Facility implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private String name;
	private String type;
	private ContentType contentType;
	private FacilityStatus status;
	private String image;
	private Location location;
	private String businessHours;
	private double rating;
	
	private Boolean isDeleted;
	
	public Facility(String name, String type, ContentType contentType, FacilityStatus status,
			String image, Location location, String businessHours, double rating) {
		super();
		this.name = name;
		this.type = type;
		this.contentType = contentType;
		this.status = status;
		this.image = image;
		this.location = location;
		this.businessHours = businessHours;
		this.rating = rating;
	}
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public ContentType getContentType() {
		return contentType;
	}
	public void setContentType(ContentType contentType) {
		this.contentType = contentType;
	}
	public FacilityStatus getStatus() {
		return status;
	}
	public void setStatus(FacilityStatus status) {
		this.status = status;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public String getBusinessHours() {
		return businessHours;
	}
	public void setBusinessHours(String businessHours) {
		this.businessHours = businessHours;
	}
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	
	public Boolean isDeleted() {
		return isDeleted;
	}
	

}
