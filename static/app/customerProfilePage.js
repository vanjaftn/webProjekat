Vue.component("customer-profile-page", {
	data: function () {
		return {
			user: {username:'', password: '', name: '', lastName: '', email: '', gender: '', dateOfBirth: '', role: '' },
			valid: true,
			errorMessage: '',
			successMessage: '',
			showPassword: false,
			role : window.localStorage.getItem('role'),
	      	jwt: window.localStorage.getItem('jwt'),
			facility: null,
			customerPoints: null,
			customerMembership: null,
		}
	},
	template: `
	<div>
			<navbar></navbar>
			<div class="container login-container">
				<div class="row justify-content-center">
					<div class="col-lg-6  col-md-8 col-sm-8">
						<div class="card">
							<div class="card-title text-center border-bottom m-3">
								<h2>Profile</h2>
							</div>
							<div class="card-body">
								<form>
									<div class="form-group mb-4">
										<input v-model="user.username" type="text" class="form-control" placeholder="Username" disabled/>
									</div>
									<div class="form-group mb-3">
										<input v-if="showPassword === false" v-model="user.password" type="password" class="form-control" data-type="password" placeholder="Password" />
										<input v-else v-model="user.password" type="text" class="form-control" data-type="password" placeholder="Password" />
										<i v-if="showPassword === false" class="fa fa-eye-slash passwordIcon pointer" aria-hidden="true" v-on:click="passwordShowToggle"></i>
										<i v-else class="fa fa-eye passwordIcon pointer" aria-hidden="true" v-on:click="passwordShowToggle"></i>				
									</div>
									<div class="form-group mb-4">
										<input v-model="user.name" type="text" class="form-control" placeholder="First Name" />
									</div>
									<div class="form-group mb-4">
										<input v-model="user.lastName" type="text" class="form-control" placeholder="Last Name" />
									</div>
									<div class="form-group mb-4">
										<select v-model="user.gender" class="form-select">
											<option value="" disabled>Gender</option>
											<option value="MALE">Male</option>
							                <option value="FEMALE">Female</option>
							            </select>
									</div>
									<div class="form-group mb-4">
										<label>Date of birth:</label>
										<input v-model="user.dateOfBirth" type="date" id="dateOfBirthID" class="form-control" style="margin-top: 9px;">
									</div>
									<p v-if="valid === false" class="errorMessage mt-2">{{errorMessage}}</p>
									<p v-else class="successMessage mt-2">{{successMessage}}</p>
									<div class="d-grid">
										<button class="btn btn-primary" v-on:click="edit">Edit</button>
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
		edit : function (event) {
		
		console.log(this.user.username)
		console.log(this.user.role)
		console.log(this.role)
		
					
			var dates = document.getElementById("dateOfBirthID").value;
       		var d=new Date(dates).toISOString().substr(0, 10);

			if(this.user.password == ''){
				this.errorMessage = "Password can not be empty";
				this.valid = false;
			} else if(this.user.name == ''){
				this.errorMessage = "Name can not be empty";
				this.valid = false;
			} else if(this.user.lastName == ''){
				this.errorMessage = "Last name can not be empty";
				this.valid = false;
			}

			if(this.valid == true){	
				let editedUser = {
					username : this.user.username,
					password : this.user.password,
					name : this.user.name,
					lastName : this.user.lastName,
					gender : this.user.gender, 
					dateOfBirth : d,
					role: this.role
				}
				
				axios
					.post('/user/edit', JSON.stringify(editedUser))
					.then(response => {
						this.user = {
							username : response.data.username,
							password : response.data.password,
							name : response.data.name,
							lastName : response.data.lastName,
							gender : response.data.gender == "MALE" ? 'MALE' : 'FEMALE',
							dateOfBirth : response.data.dateOfBirth,
							role : response.data.role
						}
						this.successMessage = "Edited successfully"
					})
					.catch(error => {
					 	console.log(error.response)
				});
				
				if(this.role == "MANAGER"){
					let editedManager = {
						username : this.user.username,
						password : this.user.password,
						name : this.user.name,
						lastName : this.user.lastName,
						gender : this.user.gender, 
						dateOfBirth : d,
						role: this.role,
						facility: this.facility
					}
					axios
						.post('/manager/edit', JSON.stringify(editedManager))
						.then(response => {
							console.log(response)
						})
						.catch(error => {
							console.log(error)
						})
				}
				
				if(this.role == "CUSTOMER"){		
					let editedCustomer = {
						username : this.user.username,
						password : this.user.password,
						name : this.user.name,
						lastName : this.user.lastName,
						gender : this.user.gender, 
						dateOfBirth : d,
						role: this.role,
						isDeleted: this.user.isDeleted,
						membership: this.customerMembership,
						points: this.customerPoints,
					}
					console.log(editedCustomer)
					axios
						.post('/customer/edit', JSON.stringify(editedCustomer))
						.then(response => {
							console.log(response)
						})
						.catch(error => {
							console.log(error)
						})
					
					console.log(this.user)
				}
				if(this.role == "TRAINER"){
					axios
						.post('/trainer/edit', JSON.stringify(editedUser))
						.then(response => {
							console.log(response)
						})
						.catch(error => {
							console.log(error)
						})
				}	
			}
		}
	},
	mounted(){
		console.log(this.jwt)
		console.log(this.role)
		
			axios
				.get('/getOneUser',
	                { params : {
	                  jwt: this.jwt
	                }})
				.then(response => {
					this.user = response.data;
				})
			
			axios
				.get('/manager/')
				.then(response => {
					this.facility = response.data.facility
					console.log(this.facility)
				})
			
			axios
				.get('/customer/customer/')
				.then(response => {
					this.customerPoints = response.data.points
					this.customerMembership = response.data.membership
					console.log(response.data)
				})
				.catch(error => console.log(error))
			
				
		}
});