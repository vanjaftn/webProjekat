package beans;

import java.io.Serializable;

public class MembershipItem implements Serializable{
	private int quantity;
	private Training training;
	public MembershipItem(int quantity, Training training) {
		super();
		this.quantity = quantity;
		this.training = training;
	}
	public int getQuantity() {
		return quantity;
	}
	public Training getTraining() {
		return training;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public void setTraining(Training training) {
		this.training = training;
	}

}
