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
			errorMessageRegistration: '', 
			showPasswordReg: false
		}
	},
	template:  `
		<div id="register-page">
			<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
			  <div class="container-fluid">
			    <a class="navbar-brand" >LOGO</a>
			    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			      <span class="navbar-toggler-icon"></span>
			    </button>
			    <div class="collapse navbar-collapse" id="navbarSupportedContent">
			      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
			        <li class="nav-item">
			          <a class="nav-link active">Home</a>
			        </li>
			      </ul>
			    </div>
			  </div>
			</nav>
			
			
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
									<p class="errorMessage mt-2">{{errorMessageRegistration}}</p>
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
			
			if (this.usernameRegistration == '') {
				this.errorMessageRegistration = "Please fill in all fields.";
			} else if (this.passwordRegistration == '') {
				this.errorMessageRegistration = "Please fill in all fields.";
			} else if (this.lastNameRegistration == '') {
				this.errorMessageRegistration = "Please fill in all fields.";
			} else if (this.firstNameRegistration == '') {
				this.errorMessageRegistration = "Please fill in all fields.";
			} else if (this.genderRegistration == '') {
				this.errorMessageRegistration = "Please fill in all fields.";
			} else if (this.date == '') {
				this.errorMessageRegistration = "Please fill in all fields.";
			} else {
				
				
				
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
				
				
				let registratedUser = {
					username: this.usernameRegistration,
					password: this.passwordRegistration,
					name: this.firstNameRegistration,
					lastName: this.lastNameRegistration,
					gender: gender,
					dateOfBirth: date, 
					role: 'CUSTOMER'	
				}
				axios 
	    			.post('/user/register', JSON.stringify(registratedUser))
	    			.then(response => {
	    				if (response.data == "") {
	    					this.errorMessage = "invalid sing in"
						
	    				} else {
							localStorage.setItem("user-info", document.getElementById("usernameReg").value)
							window.location.href = "#/customer?id=" + response.data.role;
							
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