Vue.component("newTrainer-page", {
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
		<div id="register-page">
			<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
				  <div class="container-fluid">
				    <a class="navbar-brand">LOGO</a>
				    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				      <span class="navbar-toggler-icon"></span>
				    </button>
				    <div class="collapse navbar-collapse" id="navbarSupportedContent">
				      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
				        <li v-on:click="adminHome" class="nav-item">
				          <a class="nav-link pointer">Home</a>
				        </li>
				      </ul>
					  <ul class="navbar-nav">
						<li class="nav-item dropdown">
				          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				           <i class="fa fa-plus me-1"></i>New
				          </a>
				          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
				            <li v-on:click="addNewManager"><a class="dropdown-item pointer">New manager</a></li>
				            <li v-on:click="addNewTrainer"><a class="dropdown-item active pointer">New trainer</a></li>
				            <li><hr class="dropdown-divider"></li>
				            <li v-on:click="addNewFacility"><a class="dropdown-item pointer">New facility</a></li>
				          </ul>
				        </li>
						<li class=nav-item>
							<a v-on:click="allUsers" class="nav-link ms-3 pointer"><i class="fa fa-users me-1" aria-hidden="true"></i>All users</a>
						</li>
						<li class=nav-item>
							<a v-on:click="profilePage" class="nav-link ms-3 pointer"><i class="fa fa-user me-1" aria-hidden="true"></i>Profile</a>
						</li>
						<li class=nav-item>
							<a class="nav-link ms-3 pointer" v-on:click="logout"><i class="fa fa-sign-out me-1" aria-hidden="true"></i>Log out</a>
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
								<h2>New trainer</h2>
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
		adminHome: function(event) {
			window.location.href = "#/admin"
		},
		addNewTrainer: function (event) {
			window.location.href = "#/newTrainer"
		},
		addNewManager: function (event) {
			window.location.href = "#/newManager"
		},
		addNewFacility: function (event) {
			window.location.href = "#/newFacility"
		},
		allUsers: function (event) {
			window.location.href = "#/usersProfileView";
		},
		profilePage: function (event) {
			window.location.href = "#/profile";
		},
		logout: function (event) {
			localStorage.clear();
			window.location.href = "#/";
		},
		passwordShowToggleReg : function (event) {
			this.showPasswordReg = !this.showPasswordReg;	
		},	
		userRegistration: function (event) {
			
			event.preventDefault();
			
			let getDateById = document.getElementById("dateOfBirthID").value;
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
		    }
		    else if(this.genderRegistration == ''){
				this.errorMessageRegistration = "Please choose gender.";
				this.valid = false;
		    }else if(!date){
				this.errorMessageRegistration = "Please salect date of birth.";
				this.valid = false;
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
					role: 'TRAINER'	
				}
				axios 
	    			.post('/user/register', JSON.stringify(registratedUser))
	    			.then(response => {
	    				if (response.data == "") {
	    					this.valid=false;
    						this.errorMessageRegistration = "Username already exist."
						} else {
							this.valid=true;
							this.successMessage = "New trainer registred successfully."
							this.showResetButton = true;
							this.usernameRegistration = '',
							this.passwordRegistration = '',
							this.firstNameRegistration = '',
							this.lastNameRegistration = '',
							this.genderRegistration = '',
							this.dateRegistration = ''
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