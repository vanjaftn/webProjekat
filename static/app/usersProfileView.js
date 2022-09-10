Vue.component("usersList-page",  {
		data: function ()  {
			return  {
				users:null,
				searchFname: '',
				searchLname: '',
				searchUsername: '',
				refreshSearchHidden: true
				}
		},
		template: `
			<div id="usersList-page">
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
				            <li v-on:click="addNewTrainer"><a class="dropdown-item pointer">New trainer</a></li>
				            <li><hr class="dropdown-divider"></li>
				            <li v-on:click="addNewFacility"><a class="dropdown-item pointer">New facility</a></li>
				          </ul>
				        </li>
						<li class=nav-item>
							<a v-on:click="allUsers" class="nav-link ms-3 active pointer"><i class="fa fa-users me-1" aria-hidden="true"></i>All users</a>
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
					
				
	<!-- .............................................SEARCH ..............................................................................-->		
	
	
			<div class="container row gx-3 gy-2 align-items-center search-box flex-lg-nowrap">
			
		  		<div class="col-sm-4">
		    		<input v-model="searchFname" v-on:keyup="enterPressedSearch" type="text" class="form-control" id="firstName" placeholder="First name...">
		  		</div>
		  		<div class="col-sm-4">
					<input v-model="searchLname" v-on:keyup="enterPressedSearch" type="text" class="form-control" placeholder="Last name...">
	  			</div>
		  		<div class="col-sm-4">
		   			<input v-model="searchUsername" v-on:keyup = "enterPressedSearch" type = "text" class = "form-control" placeholder = "Username..."> 
		 		</div>
						  
			    <div class="col-auto">
				    <button type="submit" v-on:click="searchUsers" class="btn btn-primary">Search</button>
			    </div>
			
			</div>
			
			<div v-if="!refreshSearchHidden" class="container refreshSearch row justify-content-end">
		 		<div class="col-sm-4">
					<button v-on:click="resetSearch" class="btn btn-outline-primary">Reset Search</button>
				</div>
			</div>

		<!-- .............................................USERS VIEW ..............................................................................-->		
			
			<div class="container result-box d-flex justify-content-center pt-2 pb-2">
				<div class="row row-cols-1 row-cols-md-2 g-4" style = "background-color: #dcdff5">
					<div v-for="user in users" v-if="user.role != 'ADMIN' " style = "background-color: #dcdff5">
						<div class="card h-100 cardHover" style="max-width: 540px; background-color: #a1d2e3; border-radius: 20px">
	  						<div class="row g-0">
							    <div class="col-md-8">
							      <div class="card-body pt-0">
									<div class="card-text">
										<small class="text-muted">{{user.role}}</small>
									</div>
									<span class="float-end ps-2"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
							        <h5 class="card-title">{{user.name}} {{user.lastName}}</h5>
							        <p class="card-text">{{user.username}}</p>
							      </div>
							    </div>
	  						</div>
						</div>
					</div>
				</div>
			</div>
				
				
		</div>
		`,
		methods:  {
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
		resetSearch : function (event) {
				this.searchFname = '',
				this.searchLname = '',
			    this.searchUsername = '',
				this.searchUsers();
			},
			searchUsers : function (event) {
				this.refreshSearchHidden = !this.refreshSearchHidden;
				
					let searchParameters = {
							name : this.searchFname,
							lastName : this.searchLname,
		    				username : this.searchUsername		
	    			}
	
	    			axios 
			    		.post('/users/searchUsers', JSON.stringify(searchParameters))
			    		.then(response => {
			    		   this.users = response.data;
							console.log(this.users)
			    	})
			},
			enterPressedSearch: function (event) {
				if (event.keyCode === 13) {
					this.searchUsers();
				}
			},
		},
		mounted ()  {
			axios
				.get('/users/getAll')
				.then(response => {
					if(response.data != null) {
						this.users= response.data;
						console.log(this.users)
					}
				})
		}
	})