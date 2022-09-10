package dto;

import java.util.ArrayList;

import beans.Training;

public class TrainingSortDTO {
		
		private String mode;
		private String parameter;
		private String name;
		private ArrayList<Training> trainings;
		
		public TrainingSortDTO(String mode, String parameter, String name, ArrayList<Training> trainings) {
			super();
			this.mode = mode;
			this.parameter = parameter;
			this.name = name;
			this.trainings = trainings;
		}

		public ArrayList<Training> getTrainings() {
			return trainings;
		}

		public void setTrainings(ArrayList<Training> trainings) {
			this.trainings = trainings;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
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
