package beans;

import java.io.Serializable;

public class Location implements Serializable{

   private int latitude;
   private int longitude;
   private Address address;
   
public int getLatitude() {
	return latitude;
}
public void setLatitude(int latitude) {
	this.latitude = latitude;
}
public int getLongitude() {
	return longitude;
}
public void setLongitude(int longitude) {
	this.longitude = longitude;
}
public Address getAddress() {
	return address;
}
public void setAddress(Address address) {
	this.address = address;
}
@Override
public String toString() {
	String ret =  latitude + " " + longitude + " " + address.getStreet() + " " + address.getCity() + " " + address.getNumber() + " " + address.getCountry();
	return ret.trim();}

}