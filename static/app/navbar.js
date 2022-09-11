Vue.component("navbar", {
	data: function () {
	    return {
	      role : window.localStorage.getItem('role'),
          jwt: window.localStorage.getItem('jwt'),
	      isTrainer: false,
	      isCustomer: false,
		  trainer: {username:'', password:'', name:'', lastName:'', gender: {}, dateOfBirth: '', role:''},
		  customer: {username:'', password:'', name:'', lastName:'', gender: {}, dateOfBirth: '', role:'', points: 0, customerType: {}, membership: {}},	
		  isAdmin: false,    
}	
	},
	    template: `
	    <div id="home">
				<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
				  <div class="container-fluid">
				    <a class="navbar-brand"></a>
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
						
						<li v-if="this.isAdmin == true" class="nav-item dropdown">
				          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				           <i class="fa fa-plus me-1"></i>New
				          </a>
				          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
				            <li v-on:click="addNewManager"><a class="dropdown-item pointer" >New manager</a></li>
				            <li v-on:click="addNewTrainer"><a class="dropdown-item pointer" >New trainer</a></li>
				            <li><hr class="dropdown-divider"></li>
				            <li v-on:click="addNewFacility"><a class="dropdown-item pointer">New facility</a></li>
				          </ul>
				        </li>
						<li v-if="this.isAdmin == true" class=nav-item>
							<a v-on:click="allUsers" class="nav-link ms-3 pointer"><i class="fa fa-users me-1" aria-hidden="true"></i>All users</a>
						</li>
						<li v-if="this.isAdmin == true" class=nav-item>
							<a v-on:click="comments" class="nav-link ms-3 pointer"><i class="fa fa-comments me-1" aria-hidden="true"></i>Comments</a>
						</li>
					
						
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
	this.checkIfAdmin()

},
methods: {	
		checkIfAdmin: function(){
			if(this.role == 'ADMIN'){
				console.log("admin")
				this.isAdmin = true
				
			}
		},
		comments: function (event) {
			router.push("/adminComments")
		},
		addNewTrainer: function (event) {
			router.push("/newTrainer")
		},
		addNewManager: function (event) {
			router.push("/newManager")
		},
		addNewFacility: function (event) {
			router.push("/newFacility")
		},
		allUsers: function (event) {
			router.push("/usersProfileView")
		},
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