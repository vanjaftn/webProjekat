Vue.component("navbar", {
	data: function () {
	    return {
	      role : window.localStorage.getItem('role'),
          jwt: window.localStorage.getItem('jwt'),
	      isTrainer: false,
	      isCustomer: false,
		  trainer: {username:'', password:'', name:'', lastName:'', gender: {}, dateOfBirth: '', role:''},
		  customer: {username:'', password:'', name:'', lastName:'', gender: {}, dateOfBirth: '', role:'', points: 0, customerType: {}, membership: {}}
	    }
	},
	    template: `
	    <div id="home">
				<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
				  <div class="container-fluid">
				    <a class="navbar-brand" href="/#">LOGO</a>
				    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				      <span class="navbar-toggler-icon"></span>
				    </button>
				    <div class="collapse navbar-collapse" id="navbarSupportedContent">
				      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
				        <li class="nav-item">
				          <a class="nav-link active" aria-current="page" v-on:click="homePage">Home</a>
				        </li>
				        <li>
				          <a class="nav-link active" aria-current="page" v-if="this.isTrainer == true" v-on:click="trainerTrainings">My trainings</a>
				      	</li>
				      	<li>
				          <a class="nav-link active" aria-current="page" v-if="this.isCustomer == true" v-on:click="customerTrainings">My trainings</a>
				      	</li>
				      </ul>
					  <ul class="navbar-nav" v-if = "this.jwt!='-1' && this.jwt != null">
						<li class=nav-item>
							<a class="nav-link ms-3 pointer" v-on:click="profilePage"><i class="fa fa-user me-1" aria-hidden="true"></i>Profile</a>
						</li>
						<li class=nav-item>
							<a class="nav-link ms-3 pointer" v-on:click="logout"><i class="fa fa-sign-out me-1" aria-hidden="true"></i>Log out</a>
						</li>
					  </ul>
					<ul class="navbar-nav" v-else>
						<li class=nav-item>
							<a class="nav-link ms-3 pointer" v-on:click="login"><i class="fa fa-user me-1" aria-hidden="true"></i>Login</a>
						</li>
						<li class=nav-item>
							<a class="nav-link ms-3 pointer" v-on:click="register"><i class="fa fa-sign-in me-1" aria-hidden="true"></i>Sign in</a>
						</li>
					  </ul>
				    </div>
				  </div>
				</nav>
			</div>
    	    `,
mounted () {

	this.checkIfTrainer()
	this.checkIfCustomer()

},
methods: {	
		checkIfTrainer: function(){
			if(this.role == 'TRAINER')
			{
			this.isTrainer = true
			axios
				.get('/getTrainer',
					{params:{
						jwt: this.jwt
					}})
				.then(response => {
					this.trainer = response.data
					
					console.log(this.trainer)
				
				})
			}
		},
		checkIfCustomer: function(){
			if(this.role == 'CUSTOMER')
			{
			this.isCustomer = true
			axios
				.get('/getCustomer',
					{params:{
						jwt: this.jwt
					}})
				.then(response => {
					this.customer = response.data
					
					console.log(this.customer)
				
				})
			}
		},
		homePage: function(event) {
			router.push("/")
		},
		trainerTrainings: function(event){
			router.push("/trainerTrainings")
		},
		customerTrainings: function(event){
			router.push("/customerTrainings")
		},
   		logout : function(event) {
   		
	        localStorage.setItem("role", '');
	        localStorage.setItem("jwt", '-1');
	        router.push("/");
	        window.location.reload();
	    },
	    profilePage : function(event) {
			router.push("/customerProfile");
		},
		login: function(event) {
			router.push("/login");		
		},
		register: function(event) {
			router.push("/register");		
		}

    }

});