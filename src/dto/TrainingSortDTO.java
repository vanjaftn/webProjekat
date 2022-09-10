package dto;

public class TrainingSortDTO {
		
		private String mode;
		private String parameter;
		private String trainer;
		
		public TrainingSortDTO(String mode, String parameter, String trainer) {
			super();
			this.mode = mode;
			this.parameter = parameter;
			this.trainer = trainer;
		}

		public String getTrainerName() {
			return trainer;
		}

		public void setTrainerName(String trainer) {
			this.trainer = trainer;
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
