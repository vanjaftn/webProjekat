Vue.component("newTraining", {
	data: function () {
		return {
			facility: {},
			training: {name:'', type: {}, description: '', picture: '', sportsFacility: '', duration: '', trainer:'', price: 0 },
		  	trainers: {},
			types: {},
			valid: true,
			errorMessage: '',
			successMessage: '',
			showPassword: false,
			role : window.localStorage.getItem('role'),
	      	jwt: window.localStorage.getItem('jwt')
		}
	},
	template: `
	<div>
			<navbar></navbar>
			<div class="container login-container">
				<div class="row justify-content-center">
					<div class="col-lg-6  col-md-6 col-sm-6">
						<div class="card">
							<div class="card-title text-center border-bottom m-3">
								<h2>New training</h2>
							</div>
							<div class="card-body">
								<form>
									<div class="form-group mb-4">
										<label>Name</label>
										<input v-model="training.name" type="text" class="form-control" placeholder="Name" />
									</div>
									<div class="form-group mb-3" v-if="this.types != undefined">
										<label>Type</label>
			                            <select v-model="training.type" class="form-select">
											<option value="" disabled>Type</option>
											<option value="GROUP">Group</option>
							                <option value="PERSONAL">Personal</option>
							                <option value="GYM">Gym</option>
							            </select>
									</div>
									<div class="form-group mb-4">
										<label>Description</label>
										<input v-model="training.description" type="text" class="form-control" placeholder="Description" />
									</div>
									<div class="form-group mb-4">
										<label>Picture</label>
										<input v-model="training.picture" type="text" class="form-control" placeholder="Picture" />
									</div>
									<div class="form-group mb-4">
										<label>Duration</label>
										<input v-model="training.duration" class="form-control" placeholder="Duration">
									</div>
									<div class="form-group mb-3" >
										<select class="form-select" v-model="training.trainer">
											<option value="" disabled>Trainer</option>
											<option v-bind:value="t.username" v-for="t in trainers">{{t.name}} {{t.lastName}}</option>
										</select>
									</div>
									<div class="form-group mb-4">
										<label>Price</label>
										<input v-model="training.price" class="form-control" placeholder="Price">
									</div>
									<p v-if="valid === false" class="errorMessage mt-2">{{errorMessage}}</p>
									<p v-else class="successMessage mt-2">{{successMessage}}</p>
									<div class="d-grid">
										<input type="submit" v-on:click = "createNewTraining" value="Add"></input>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
	
		</div>
	`, methods: {
		passwordShowToggle : function (event) {
			this.showPassword = !this.showPassword;	
		},
		createNewTraining: function(event){
		event.preventDefault()
		
             axios
			.post("/training/createNewTraining", JSON.stringify(this.training))
			.then(response => {
				if(response.data != null) {
					console.log(response.data)
					router.push('/singleFacility')
				}
			})
		},
		getAllTrainers: function(){
             axios
				.get('/getAllTrainers')
				.then(response => {
					this.trainers = response.data
					
					console.log(this.trainers)
				
				})
		
		}
	},
	mounted(){
	
			axios
			.get("oneFacility/",
            { params : {
                facilityName : window.localStorage.getItem('facilityId')
             }})
             .then(response => {
             this.facility = response.data
             this.training.sportsFacility = this.facility.name
             console.log(this.facility)
             console.log(this.training.sportsFacility)
             
             this.getAllTrainers()
             })
             
		}
});