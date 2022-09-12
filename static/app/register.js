Vue.component("register-page", {
	data: function() {
		return {
			usernameRegistration: '',
			passwordRegistration: '',
			firstNameRegistration: '',
			lastNameRegistration: '',
			genderRegistration: '',
			dateRegistration: '',
			roleRegistration: '',
			errorMessage: '', 
			showPasswordReg: false
		}
	},
	template:  `
		<div id="register-page">
			<navbar/>
			
			
			<div class="container login-container">
				<div class="row justify-content-center">
					<div class="col-lg-6  col-md-8 col-sm-8">
						<div class="card">
							<div class="card-title text-center border-bottom m-3">
								<h2>Sing up</h2>
							</div>
							<div class="card-body">
								<form>
									<div class="form-group mb-4">
										<input v-model="usernameRegistration" type="text" class="form-control" placeholder="Username" id="usernameReg"/>
									</div>
									<div class="form-group mb-3">
										<input v-if="showPasswordReg === false" v-model="passwordRegistration" type="password" class="form-control" data-type="password" placeholder="Password" />
										<input v-else v-model="passwordRegistration" type="text" class="form-control" data-type="password" placeholder="Password" />
										<i v-if="showPasswordReg === false" class="fa fa-eye-slash passwordIcon pointer" aria-hidden="true" v-on:click="passwordShowToggleReg"></i>
										<i v-else class="fa fa-eye passwordIcon pointer" aria-hidden="true" v-on:click="passwordShowToggleReg"></i>				
									</div>
									<div class="form-group mb-4">
										<input v-model="firstNameRegistration" type="text" class="form-control" placeholder="First Name" />
									</div>
									<div class="form-group mb-4">
										<input v-model="lastNameRegistration" type="text" class="form-control" placeholder="Last Name" />
									</div>
									<div class="form-group mb-4">
										<select v-model="genderRegistration" class="form-select">
											<option value="" selected disabled>Gender</option>
											<option value="MALE">Male</option>
							                <option value="FEMALE">Female</option>
							            </select>
									</div>
									<div class="form-group mb-4">
										<label>Date of birth:</label>
										<input v-model="dateRegistration" type="date" id="dateOfBirthID" class="form-control" style="margin-top: 9px;">
									</div>
									<p class="errorMessage mt-2">{{errorMessage}}</p>
									<div class="d-grid">
										<button class="btn btn-primary" v-on:click="userRegistration" type="button">Sing up</button>
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
		passwordShowToggleReg : function (event) {
			this.showPasswordReg = !this.showPasswordReg;	
		},	
		userRegistration: function (event) {
			
			event.preventDefault();
			
			let gender;
			if (this.genderRegistration == 'MALE') {
				gender = 'MALE';
			} else if (this.genderRegistration == 'FEMALE') {
				gender = 'FEMALE';
			}
			
			let getDateById = document.getElementById("dateOfBirthID").value;
			if(getDateById) {
				var date = new Date(getDateById).toISOString().substr(0,10);
			}
			
			var valid = true;
			
			if(!this.usernameRegistration){
				valid=false;
				this.errorMessage="Please enter username"
			} else 	if(!this.passwordRegistration){
				valid=false;
				this.errorMessage="Please enter password"
			} else 	if(!this.firstNameRegistration){
				valid=false;
				this.errorMessage="Please enter your name"
			} else 	if(!this.lastNameRegistration){
				valid=false;
				this.errorMessage="Please enter last name"
			} else 	if(!gender){
				valid=false;
				this.errorMessage="Please choose gender"
			} else 	if(!date){
				valid=false;
				this.errorMessage="Please choose date of birth"
			} else 	if(this.firstNameRegistration[0] < 'A' || this.firstNameRegistration[0] > 'Z'){
				valid=false;
				this.errorMessage="First name must start with a capital letter"
			} else 	if(this.lastNameRegistration[0] < 'A' || this.lastNameRegistration[0] > 'Z'){
				valid=false;
				this.errorMessage="Last name must start with a capital letter"
			}	
			
			if(valid){
				
				let registratedUser = {
					username: this.usernameRegistration,
					password: this.passwordRegistration,
					name: this.firstNameRegistration,
					lastName: this.lastNameRegistration,
					gender: gender,
					dateOfBirth: date, 
					role: 'CUSTOMER'	
				}
				
				let registratedCustomer = {
					username: this.usernameRegistration,
					password: this.passwordRegistration,
					name: this.firstNameRegistration,
					lastName: this.lastNameRegistration,
					gender: gender,
					dateOfBirth: date, 
					role: 'CUSTOMER',
					points: 0,
					membership: []	
				}
				axios 
	    			.post('/user/register', JSON.stringify(registratedUser))
	    			.then(response => {
	    				if (response.data == "") {
	    					this.errorMessage = "Username already exists"
						
	    				} else {
							axios
								.post('/customer/createCustomer', JSON.stringify(registratedCustomer))
								.then(response => {
										if(response.data != null) {
											console.log(response.data)
										}
								})
							router.push("/")
	    				}
	    			})
	    			.catch(error => {
					    console.log(error.response)
						console.log(error)
					});
					
				}
				
		},
		
	},
	mounted() {
		
	}
})