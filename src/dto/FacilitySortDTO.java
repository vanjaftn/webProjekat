package dto;

public class FacilitySortDTO {
	
	private String mode;
	private String parameter;
	
	public FacilitySortDTO(String mode, String parameter) {
		super();
		this.mode = mode;
		this.parameter = parameter;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}	

}
