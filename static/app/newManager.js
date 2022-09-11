Vue.component("newManager-page", {
		data: function() {
		return {
			usernameRegistration: '',
			passwordRegistration: '',
			firstNameRegistration: '',
			lastNameRegistration: '',
			genderRegistration: '',
			dateRegistration: '',
			roleRegistration: '',
			errorMessageRegistration: '', 
			showPasswordReg: false,
			successMessage: '',
			valid: true,
		}
	},
	template:  `
		<div id="register-manager-page">
			<navbar/>
			<div class="container login-container">
				<div class="row justify-content-center">
					<div class="col-lg-6  col-md-8 col-sm-8">
						<div class="card">
							<div class="card-title text-center border-bottom m-3">
								<h2>New manager</h2>
							</div>
							<div class="card-body">
								<form>
									<div class="form-group mb-4">
										<input v-model="usernameRegistration" type="text" class="form-control" placeholder="Username" />
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
									<p v-if="valid === false" class="errorMessage mt-2">{{errorMessageRegistration}}</p>
									<p v-if="valid === true" class="successMessage mt-2">{{successMessage}}</p>
									
									<div class="d-grid">
										<button class="btn btn-primary" v-on:click="userRegistration" type="button">Add</button>
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
			
			var getDateById = document.getElementById("dateOfBirthID").value;
			if(getDateById) {
				var date = new Date(getDateById).toISOString().substr(0,10);
			}	
			
				
			
			if(this.usernameRegistration == ''){
				this.errorMessageRegistration = "Please enter username.";
				this.valid = false;
			}  else if(this.passwordRegistration == ''){
				this.errorMessageRegistration = "Please enter password.";
			   this.valid = false;
		    }  else if(this.firstNameRegistration == ''){
				this.errorMessageRegistration = "Please enter your name.";
			   this.valid = false;
		    }  else if(this.lastNameRegistration == ''){
				this.errorMessageRegistration = "Please enter your last name.";
			   this.valid = false;
		    } else if(this.genderRegistration == ''){
				this.errorMessageRegistration = "Please choose gender.";
				this.valid = false;
		    }else if(!date){
				this.errorMessageRegistration = "Please salect date of birth.";
				this.valid = false;
		    } else if(this.firstNameRegistration[0] < 'A' || this.firstNameRegistration[0] > 'Z'){
				valid=false;
				this.errorMessageRegistration="First name must start with a capital letter"
			} else if(this.lastNameRegistration[0] < 'A' || this.lastNameRegistration[0] > 'Z'){
				valid=false;
				this.errorMessageRegistration="Last name must start with a capital letter"
			} else {
			

			let gender;
			if (this.genderRegistration == 'MALE') {
				gender = 'MALE';
			} else if (this.genderRegistration == 'FEMALE') {
				gender = 'FEMALE';
			}
			let registratedUser = {
					username: this.usernameRegistration,
					password: this.passwordRegistration,
					name: this.firstNameRegistration,
					lastName: this.lastNameRegistration,
					gender: gender,
					dateOfBirth: date, 
					role: 'MANAGER'	
				}
				
			var registratedManager = {
					username: this.usernameRegistration,
					password: this.passwordRegistration,
					name: this.firstNameRegistration,
					lastName: this.lastNameRegistration,
					gender: gender,
					dateOfBirth: date, 
					role: 'MANAGER'	,
					facility: null
				}
				
			axios 
    			.post('/user/register', JSON.stringify(registratedUser))
    			.then(response => {
    				if (response.data == "") {
							this.valid=false;
    						this.errorMessageRegistration = "Username already exist."
						} else {
							this.valid=true;
							this.successMessage = "New manager registred successfully."
							this.showResetButton = true;
							this.usernameRegistration = '',
							this.passwordRegistration = '',
							this.firstNameRegistration = '',
							this.lastNameRegistration = '',
							this.genderRegistration = '',
							this.dateRegistration = ''
							
							axios
								.post('/manager/createManager', JSON.stringify(registratedManager))
								.then(response => {
									if(response.data != null) {
										console.log(response.data)
									}
								})
    				}
    			})
    			.catch(error => {
				    console.log(error.response)
				});
					
		}		
			
		},
		
	},
	mounted() {
		
	}
})