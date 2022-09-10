Vue.component("manager-profile-page", {
	data: function () {
		return {
			user: null,
			valid: true,
			errorMessage: '',
			successMessage: '',
			showPassword: false,
			facility: null
		}
	},
	template: `
		<div id="managerProfilePage">
			<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
				<div class="container-fluid">
					<a class="navbar-brand">LOGO</a>
				    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				      <span class="navbar-toggler-icon"></span>
				    </button>
				    <div class="collapse navbar-collapse" id="navbarSupportedContent">
				      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
				        <li v-on:click="managerHome" class="nav-item">
				          <a class="nav-link pointer">Home</a>
				        </li>
				      </ul>
					  <ul class="navbar-nav">
						<li class=nav-item>
							<a v-on:click="managerProfile" class="nav-link ms-3 pointer active"><i class="fa fa-user me-1" aria-hidden="true"></i>Profile</a>
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
									<p v-if="valid === true" class="successMessage mt-2">{{successMessage}}</p>
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
		managerHome: function(event) {
			window.location.href = "#/manager";
		},
		managerProfile : function(event) {
			window.location.href = "/#/managerProfile"
			console.log("clicked manger profile")
		},
		logout: function (event) {
			localStorage.clear();
			window.location.href = "#/";
		},
		passwordShowToggle : function (event) {
			this.showPassword = !this.showPassword;	
		},
		edit : function (event) {
			event.preventDefault();
			
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
					role: this.user.role
				}
				
				let editedManager = {
					username : this.user.username,
					password : this.user.password,
					name : this.user.name,
					lastName : this.user.lastName,
					gender : this.user.gender, 
					dateOfBirth : d,
					role: this.user.role,
					facility: this.facility
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
						
						axios
							.post('/manager/edit', JSON.stringify(editedManager))
							.then(response => {
								console.log(response)
							})
							.catch(error => {
								console.log(error)
							})
					})
					.catch(error => {
					 	console.log(error.response)
					});
				
			}
		}
	},
	mounted(){
		axios
			.get('/user/')
			.then(response => {
				if(response.data != null){
						this.user = {
							username : response.data.username,
							password : response.data.password,
							name : response.data.name,
							lastName : response.data.lastName,
							gender : response.data.gender == "MALE" ? 'MALE' : 'FEMALE',
							dateOfBirth : response.data.dateOfBirth,
							role : response.data.role
						} 
				} else {
						console.log(response.data)
					}
			})
			.catch(error => console.log(error.response))
		
		axios
			.get('/manager/')
			.then(response => {
				this.facility = response.data.facility
			})
			
	}
})