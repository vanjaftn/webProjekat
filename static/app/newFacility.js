Vue.component("newFacility-page",  {
		 data: function () {
			return {
				status: null,
				managers: null,
				selectedManager: null,
				showAddButton: false,
				name: '',
				type: '',
				logo: '',
				latitude: '',
				longitude: '',
				street: '',
				city: '',
				number: '',
				country: '',
				hours: '',
				errorMessage: '',
				facilityType: null,
				selectedType: '',
			}
		},
		template: `
			<div id="home">
				<navbar/>				
		<div class="container new-facility-container">
				<div class="row justify-content-center">
					<div class="col-lg-6  col-md-8 col-sm-8">
						<div class="card">
							<div class="card-title text-center border-bottom m-3">
								<h2>Add new facility</h2>
							</div>
							<div class="card-body">
									<form>
									<div class="form-group mb-4">
										<input v-model="name" type="text" class="form-control" placeholder="Name"/>
									</div>
									<div class="form-group mb-4">
										<label>Type:</label>
										<select v-model="selectedType" class="form-select">
										  <option v-for="ft in facilityType" v-bind:value="ft">
				   								{{ ft }} 
										  </option>
										</select>
									</div>
									<div class="form-group mb-4 border p-2">
										<label>Location</label>
										<input v-model="street" type="text" class="form-control mt-2" placeholder="Street"/>
										<input v-model="city" type="text" class="form-control mt-2" placeholder="City"/>
										<input v-model="number" type="text" class="form-control mt-2" placeholder="Number"/>
										<input v-model="country" type="text" class="form-control mt-2" placeholder="Country"/>
										<input v-model="latitude" type="text" class="form-control mt-2" placeholder="Latitude"/>
										<input v-model="longitude" type="text" class="form-control mt-2" placeholder="Longitude"/>
									</div>
									<div class="form-group mb-4">
										<label>Image</label>
										 <input type="file" @change="logoAdded" id="img" name="img" accept="image/*">
									</div>
									<div class="form-group mb-4">
										<input v-model="hours" type="text" class="form-control" placeholder="Working hours"/>
									</div>
									
									<div class="form-group mb-4 ">
										<input type="checkbox" value="CLOSE" id="close" name="status" v-model="status"/>
										<label for="close">Closed</label>
									</div>									
									<div class="form-group mb-4">
										<label>Manager</label>
										 <select v-model="selectedManager" class="input-selection">
										  <option v-for="manager in managers" v-bind:value="manager">
				   								{{ manager.username }} : {{ manager.name }}  {{ manager.lastName }}
										  </option>
										 </select>
										<button type="button" v-if="showAddButton" v-on:click="addNewManager" class="btn btn-outline-primary">Add new manager </button>
									</div>
									<p class="errorMessage mt-2"> {{this.errorMessage}}</p>
									<div class="d-grid">
										<button v-on:click="addFacility" class="btn btn-primary" type="button">Save</button>
									</div>
									
									
								</form>
							</div>
							
						</div>
					</div>
				</div>
			</div>
			
		
	
    	</div>

		`,
		methods: {
		logoAdded(e){
            const file = e.target.files[0];
            this.createBase64Image(file);
            this.logo = URL.createObjectURL(file);
        },
        createBase64Image(file){
            const reader= new FileReader();           
            reader.onload = (e) =>{
            	let img = e.target.result;
            	this.logo = img;
            }
            reader.readAsDataURL(file);
        },
		addFacility: function(event){
			let valid = true;
			
			let facilityStatus;
			if(this.status){
				facilityStatus = 'CLOSE';
			} else {
				facilityStatus = 'OPEN';
			}
			
			if(this.name == ''){
				this.errorMessage = "Please fill in facility name.";
			}else if (!this.selectedType){
				this.errorMessage = "Please select facility type.";
			}else if (this.status == ''){
				this.errorMessage = "Please fill in facility status.";
			}else if (!this.logo){
				this.errorMessage = "Please choose in facility logo.";
			}else if (this.latitude == '' || this.longitude == '' || this.street == '' || this.city == '' || this.number == '' || this.country == ''){
				this.errorMessage = "Please fill in facility address and location.";
			}else if (this.hours == ''){
				this.errorMessage = "Please fill in facility business hours.";
			}else if (this.name[0] < 'A' || this.name[0] > 'Z'){
				this.errorMessage = "Name must start with a capital letter";	
			}else if (!this.selectedManager){
				this.errorMessage = "Please select manager";
			}else {
			
			newFacility = {
					name : this.name,
					type : this.type, 
					status : facilityStatus,
					image : this.logo,
					location: {
			      	  latitude : this.latitude,
				      longitude : this.longitude,
				      address : {
				      	  street : this.street,
					      city : this.city,
					      number : this.number,
					      country : this.country
					  }
				    },
					businessHours : this.hours,
					isDeleted : false,
				}
				
				axios
					.post('/facility/addNewFacility', JSON.stringify(newFacility))
					.then(response => {
						if(response.data == "") {
							this.errorMessage = "Facility already exists."
						} else {
							
							axios
								.post('/manager/setFacilityToManager/' + this.selectedManager.username, JSON.stringify(newFacility))
								.then(window.location.href = "#/admin");
						}
					})
					.catch(error => {
						console.log(error)
					});
				
			
			}
		},
		
		},
		mounted (){
			axios
				.get('/managers/getAllManagersWithoutFacility')
				.then(response => {
				if (response.data != null) {
					this.managers = response.data;
				}
				else{
					this.showAddButton = true;
				}
			});
			
			axios
          		.get('/facilities/getAllTypes')
          		.then(response => {
					if (response.data != null) {
						this.facilityType = response.data;	
					}
				})
				.catch(error => {
					console.log(error.response)
				});
			
			
		}

})