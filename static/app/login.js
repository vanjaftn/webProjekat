Vue.component("login-page", {
	data: function() {
		return {
			usernameLogin: '',
		    passwordLogin: '',
		    errorMessage: '', 
			passwordShow: false,
		}
	},
	template: `
		<div id="login-page">
			<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
			  <div class="container-fluid">
			    <a class="navbar-brand">LOGO</a>
			    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			      <span class="navbar-toggler-icon"></span>
			    </button>
			    <div class="collapse navbar-collapse" id="navbarSupportedContent">
			      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
			        <li class="nav-item">
					  <a class="nav-link active pointer" v-on:click="homePage">Home</a>
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
								<h2>Login</h2>
							</div>
							<div class="card-body">
								<form>
									<div class="form-group mb-4">
										<input v-model="usernameLogin" v-on:keyup="enterPresses" type="text" class="form-control" placeholder="Username" id="username"/>
									</div>
									<div class="form-group">
										<input v-if="passwordShow === false" v-model="passwordLogin" v-on:keyup="enterPresses" type="password" class="form-control" data-type="password" placeholder="Password" />
										<input v-else type="text" v-model="passwordLogin" v-on:keyup="enterPresses" class="form-control" data-type="password" placeholder="Password" />
										<i v-if="passwordShow === false" class="fa fa-eye-slash passwordIcon pointer" aria-hidden="true" v-on:click="passwordShowToggle"></i>
										<i v-else class="fa fa-eye passwordIcon pointer" aria-hidden="true" v-on:click="passwordShowToggle"></i>
									</div>
									<p class="errorMessage mt-2">{{errorMessage}}</p>
									<div class="d-grid">
										<button class="btn btn-primary" v-on:click="userLogin" type="button">Login</button>
									</div>
									<div class="d-grid mt-2">
										<p><a href="/#/register">No account? Sing up</a></p>
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
		homePage : function (event) {
			window.location.href = "#/";
		},
		passwordShowToggle : function (event) {
			this.passwordShow = !this.passwordShow;	
		},
		enterPresses: function (event) {
			if (event.keyCode === 13) {
				this.userLogin();
			}
		},
		userLogin: function (event) {
	//		event.preventDefault();
			if (this.usernameLogin == '') {
				this.errorMessage = "Please enter a valid username.";
			} else if (this.passwordLogin == '') {
				this.errorMessage = "Please enter a valid password.";
			} else {
				
				let user = {
					username: this.usernameLogin, 
					password: this.passwordLogin
				}
				axios 
    			.post('/user/login', JSON.stringify(user))
    			.then(response => {
					console.log(response.status)
    				if(response.status == "200") {
		 				if (response.data == "") {
	    					this.errorMessage = "invalid username or password"
	    				} else if(response.data.isDeleted){
		    				this.errorMessage = "Your account has been deleted."
						} else {
	    					localStorage.setItem('jwt', JSON.parse(JSON.stringify(response.data))[0]);
			            	localStorage.setItem("role", JSON.parse(JSON.stringify(response.data))[1]);
			            	alert("Success!")
								console.log(localStorage.getItem("role"))
								console.log(localStorage.getItem("jwt"))
								
           					router.push("/");		            	
	    				}
					}
    			})
    			.catch(error => {
				    console.log(error.response)
				});
			}
		}
	},
	mounted () {
		localStorage.setItem("role", '');
        localStorage.setItem("jwt", '-1')
	}
})