Vue.component("usersList-page",  {
		data: function ()  {
			return  {
				users:null,
				searchFname: '',
				searchLname: '',
				searchUsername: '',
				refreshSearchHidden: true,
				deleteThisUser: null,
				deleteUserByUsername: null,
				sortParameter:'',
				sortMode:'',
				allAdmins: false,
				showAllrb: "",
				allUsersList: null,
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
	
	
<!-- .............................................FILTER & SORT ..............................................................................-->		

	<div class = "container  filter-box-admin d-none d-md-block d-lg-block d-xxl-block">
		<div class="row align-items-start">
			<div class = "col row-cols-1 row-cols-md-2 g-4 m-3" style="max-width: 270px; background-color: #a1d2e3; border-radius: 20px">
				<div class="ms-2 mt-1">
					<p> Filter </p>		
				</div>
				<div>		
					<input type="radio" @change="showOnly($event)" id="admins" value="admin" name="showAll-rb" v-model="showAllrb">
			   	    <label style="color: darkgrey;" > Admin</label><br/>
			    </div>
				<div>
				    <input type="radio"  @change="showOnly($event)"  id="managers" name="showAll-rb" value="manager" v-model="showAllrb">
			        <label style="color: darkgrey;" > Manager</label><br/>
			    </div>
				<div>
				    <input type="radio"  @change="showOnly($event)" id="trainers" name="showAll-rb" value="trainer" v-model="showAllrb">
			        <label style="color: darkgrey;" > Trainer</label><br/>
			    </div>
				<div>
				    <input type="radio"  @change="showOnly($event)" id="customers" name="showAll-rb" value="customer" v-model="showAllrb">
			        <label style="color: darkgrey;" > Customer</label><br/>
			    </div> 
				<div class="float-end text-end me-2 mb-1">
					<button v-if="showAllrb" v-on:click="filterReset" class="btn btn-outline-primary"> Reset </button>
				</div>  	
			</div>
		
		 
			<div class = "col row-cols-1 row-cols-md-2 g-4 m-3" style="max-width: 22rem; background-color: #a1d2e3; border-radius: 20px">
				<div class="ms-2 mt-1">
					 Sort 	
				</div>
				
				 
				   <div class=" row ms-4">
				      <div class=" col-auto ">		
						<input type="radio" @change="setNameAsSortParameter($event)" name="sort">
		        		<label style="color: darkgrey;"> Name</label>
		        	</div>
					<div class=" col-auto ">
					    <input type="radio" @change="setSurnameAsSortParameter($event)" name="sort">
		       		 	<label style="color: darkgrey;"> Last Name </label>
		       	 	</div>
					<div class=" col-auto">
					    <input type="radio" @change="setUsernameAsSortParameter($event)" name="sort">
		        		<label style="color: darkgrey;"> Username</label>
		        	</div>
		<!--			<div class=" col-auto ">
					    <input type="radio" @change="setNumberOfPointsAsSortParameter($event)" name="sort">
		        		<label style="color: darkgrey;"> Points</label>
		       	
					</div>
			-->		<hr class="bg-danger border-2 border-top border-danger ms-2">
					<div class=" col-auto ">		
							<input type="radio" @change="setDescendingSortMode($event)" name="sortD">
		        			<label style="color: darkgrey;"> Descending</label>
			        	</div>
						<div class=" col-auto">
						  	<input type="radio" @change="setAscendingSortMode($event)" name="sortD">
			        		<label style="color: darkgrey;" > Ascending</label>
			        </div>   
				  </div>
					<div class="float-end text-end me-2 mb-1">
						<button type="submit" class="btn btn-primary " v-on:click="sortUsers">Sort</button>
					</div> 
				   
				  </div>
	
		</div>
	</div>	
				
			<div class="dropbox-menu d-block d-lg-none">
				<div class="dropdown">
				  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuClickable" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
				  	Filter and Sort
				  </button>
				  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
				    <li><div class="dropdown-item">
						Fiter
						<div>		
							<input type="radio" @change="showOnly($event)" id="admins1" value="admin1" name="showAll-rb" v-model="showAllrb">
					   	    <label style="color: darkgrey;" > Admin</label><br/>
					    </div>
						<div>
						    <input type="radio"  @change="showOnly($event)"  id="managers1" name="showAll-rb" value="manager1" v-model="showAllrb">
					        <label style="color: darkgrey;" > Manager</label><br/>
					    </div>
						<div>
						    <input type="radio"  @change="showOnly($event)" id="trainers1" name="showAll-rb" value="trainer1" v-model="showAllrb">
					        <label style="color: darkgrey;" > Trainer</label><br/>
					    </div>
						<div>
						    <input type="radio"  @change="showOnly($event)" id="customers1" name="showAll-rb" value="customer1" v-model="showAllrb">
					        <label style="color: darkgrey;" > Customer</label><br/>
					    </div> 
						<div class="float-end text-end me-2 mb-1">
							<button v-if="showAllrb" v-on:click="filterReset" class="btn btn-outline-primary"> Reset </button>
						</div>  
					</div></li>
					<li><hr class="dropdown-divider"></li>
				    <li><div class="dropdown-item">
						Sort
						<div class=" row ">
					      <div class=" col-auto ">		
							<input type="radio" @change="setNameAsSortParameter($event)" name="sort">
			        		<label style="color: darkgrey;"> Name</label>
			        	</div>
						<div class=" col-auto ">
						    <input type="radio" @change="setSurnameAsSortParameter($event)" name="sort">
			       		 	<label style="color: darkgrey;"> Last Name </label>
			       	 	</div>
						<div class=" col-auto">
						    <input type="radio" @change="setUsernameAsSortParameter($event)" name="sort">
			        		<label style="color: darkgrey;"> Username</label>
			        	</div>
			<!--			<div class=" col-auto ">
						    <input type="radio" @change="setNumberOfPointsAsSortParameter($event)" name="sort">
			        		<label style="color: darkgrey;"> Points</label>
			       	
						</div>
				-->		<hr class="bg-danger border-2 border-top border-danger ms-2">
						<div class=" col-auto ">		
								<input type="radio" @change="setDescendingSortMode($event)" name="sortD">
			        			<label style="color: darkgrey;"> Descending</label>
				        	</div>
							<div class=" col-auto">
							  	<input type="radio" @change="setAscendingSortMode($event)" name="sortD">
				        		<label style="color: darkgrey;" > Ascending</label>
				        </div>   
					  </div>
					</div></li>
				    <li><div class="dropdown-item float-end text-end me-2 mb-1" >
							<button type="submit" class="btn btn-primary " v-on:click="sortUsers">Sort</button>
					</div></li>
				  </ul>
				</div>
			</div>
		
				
				
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
			
			<div v-if="searchFname || searchLname || searchUsername" class="container refreshSearch row justify-content-end">
		 		<div class="col-sm-4">
					<button v-on:click="resetSearch" class="btn btn-outline-primary">Reset Search</button>
				</div>
			</div>

		<!-- .............................................USERS VIEW ..............................................................................-->		
			
			<div class="container result-box d-flex justify-content-center pt-2 pb-2">
				<div class="row row-cols-1 row-cols-md-2 g-4 fit-one" style = "background-color: #dcdff5">
					<div v-for="user in users" v-if="user.isDeleted === false" style = "background-color: #dcdff5">
						<div class="card h-100 cardHover" style="max-width: 540px; background-color: #a1d2e3; border-radius: 20px">
	  						<div class="row g-0">
							    <div class="col-md-8">
							      <div class="card-body pt-0">
									<div class="card-text">
										<small class="text-muted">{{user.role}}</small>
									</div>
									<span v-on:click="deleteDialog(user)" class="float-end ps-2 trigger-btn" data-bs-toggle="modal" data-bs-target="#modalLogin"><i class="fa fa-trash" aria-hidden="true"></i></span>
							        <h5 class="card-title">{{user.name}} {{user.lastName}}</h5>
							        <p class="card-text">{{user.username}}</p>
							      </div>
							    </div>
	  						</div>
						</div>
					</div>
				</div>
			</div>

		<!-- ...................................................... DELETE MODAL ............................................................. -->
			
			<div class="deleteModal">
				<div class="modal fade" id="modalLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered modal-confirm ">
				    <div class="modal-content">
				      <div class="modal-header flex-column">
						<div class="icon-box">
							<i class="material-icons">&#xE5CD;</i>
						</div>						
						<h4 class="modal-title w-100">Are you sure?</h4>					      
				      </div>
				      <div class="modal-body">
				        <p>Are you sure you want to delete user:</p>
						<p class="fw-bold">{{deleteThisUser}} ?<p/>
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-info" data-bs-dismiss="modal">Cancel</button>
				        <button type="button" v-on:click="deleteUser" class="btn btn-danger" data-bs-dismiss="modal">Delete</button>
				      </div>
				    </div>
				  </div>
				</div> 
			</div>
					
				
		</div>
		`,
		methods:  {
		filterReset: function(event) {
			this.showAllrb="";
			this.users=this.allUsersList;
			
		},	
		showOnly : function (event) {
			
			let sortParameters = {
				users: this.users
			}
			if(this.showAllrb == 'admin' || this.showAllrb == 'admin1'){
				axios
					.post('/users/getAllAdmins', JSON.stringify(sortParameters))
					.then(response => {
						if(response.data != null) {
							this.users= response.data;
							console.log(this.users)
						}
					})
					.catch(error => {
						console.log(error)
					});		
			} else if (this.showAllrb == 'manager' || this.showAllrb == 'manager1'){
			
				axios
					.post('/users/getAllMAnagers', JSON.stringify(sortParameters))
					.then(response => {
						if(response.data != null) {
							this.users= response.data;
							console.log(this.users)
						}
					})
					.catch(error => {
						console.log(error)
					});
			} else if (this.showAllrb == 'trainer' || this.showAllrb == 'trainer1'){
			
				axios
					.post('/users/getAllTrainers', JSON.stringify(sortParameters))
					.then(response => {
						if(response.data != null) {
							this.users= response.data;
							console.log(this.users)
						}
					})
					.catch(error => {
						console.log(error)
					});
			} else if (this.showAllrb == 'customer' || this.showAllrb == 'customer1'){
			
				axios
					.post('/users/getAllCustomers', JSON.stringify(sortParameters))
					.then(response => {
						if(response.data != null) {
							this.users= response.data;
							console.log(this.users)
						}
					})
					.catch(error => {
						console.log(error)
					});
			}		
			
		},
		
		sortUsers : function (event) {
			
				let sortParameters = {
					mode : this.sortMode,
					parameter : this.sortParameter,
					users: this.users	
    			}
    			
    			axios 
		    		.post('/user/sortUsers', JSON.stringify(sortParameters))
		    		.then(response => {
		    		   this.users = response.data;
		    		})
					.catch(error => {
						console.log(error)
					})
		},
		setAscendingSortMode : function (event) {
			this.sortMode = 'asc';
		},
		
		setDescendingSortMode : function (event) {
			this.sortMode = 'desc'
		},
		
		setNameAsSortParameter : function (event) {
			this.sortParameter = 'name';
		},
		
		setSurnameAsSortParameter : function (event) {
			this.sortParameter = 'surname';
		},
		
		setUsernameAsSortParameter : function (event) {
			this.sortParameter = 'username';
		},
		
		setNumberOfPointsAsSortParameter : function (event) {
			this.sortParameter = 'numberOfPoints';
		},
	
		deleteUser: function(event){
			axios
				.put("/user/deleteUser/" + this.deleteUserByUsername)
				.then(response => {
					if(response.data != null){
						this.users = response.data
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		deleteDialog: function(event){
			this.deleteThisUser = event.name +" "+ event.lastName
			this.deleteUserByUsername = event.username
			document.querySelector(".deleteModal");
		},
		adminHome: function(event) {
			window.location.href = "#/admin"
		},	
		comments: function (event) {
			window.location.href = "#/adminComments"
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
				this.users = this.allUsersList
				this.filterReset();
			},
			searchUsers : function (event) {
				this.refreshSearchHidden = !this.refreshSearchHidden;
				
					let searchParameters = {
							name : this.searchFname,
							lastName : this.searchLname,
		    				username : this.searchUsername,
							users: this.users		
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
						this.allUsersList = response.data;
						console.log(this.users)
					}
				})
		}
	})