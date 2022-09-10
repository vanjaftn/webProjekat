Vue.component("admin-page", {
	data: function () {
		return {
			users: null	,
			username: '',
			facilities: null,
			facilityType: null,
			searchName: '',
			searchLocation: '',
		    searchType: '',
		    searchRating: '',
			refreshSearchHidden: true,	
		}
	}, 
	template: `
		<div id="adminHome">
			<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
				  <div class="container-fluid">
				    <a class="navbar-brand" >LOGO</a>
				    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				      <span class="navbar-toggler-icon"></span>
				    </button>
				    <div class="collapse navbar-collapse" id="navbarSupportedContent">
				      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
				        <li class="nav-item">
				          <a class="nav-link active" aria-current="page">Home</a>
				        </li>
				      </ul>
					  <ul class="navbar-nav">
						<li class="nav-item dropdown">
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
				
									<!-- .............................................SEARCH ..............................................................................-->		
	
	
			<div class="container row gx-3 gy-2 align-items-center search-box flex-lg-nowrap">
				
			  		<div class="col-sm-3">
			    		<input v-model="searchName" v-on:keyup="enterPressedSearch" type="text" class="form-control" id="facilitiName" placeholder="Text...">
			  		</div>
			  		<div class="col-sm-3">
						<input v-model="searchLocation" v-on:keyup="enterPressedSearch" type="text" class="form-control" placeholder="Location...">
		  			</div>
			  		<div class="col-sm-3">
			   			<input v-model="searchType" v-on:keyup = "enterPressedSearch" type = "text" class = "form-control" placeholder = "Type..."> 
			   			 <!-- class="form-select" id="type">
							 <option value="" selected disabled>Type</option>
							<option v-for="type in facilityType">
								 {{type}}
							</option>
			    		</select> -->
			 		</div>
				
					<div class="col-sm-3">
			   			<select v-model="searchRating" class="form-select" id="rating">
							<option value="" selected disabled>Rating</option>
							<option v-for="index in 5" :key="index" v-bind:value="index">
								 {{index}}
							</option>
			    		</select>
			 		</div>
				  
				    <div class="col-auto">
					    <button type="submit" v-on:click="searchFacilities" class="btn btn-primary">Search</button>
				    </div>
				
			</div>
			
			<div v-if="!refreshSearchHidden" class="container refreshSearch row justify-content-end">
		 		<div class="col-sm-3">
					<button v-on:click="resetSearch" class="btn btn-outline-primary">Reset Search</button>
				</div>
			</div>
			
		<!-- .............................................FACILITIES VIEW ..............................................................................-->		

			
			<div class="container result-box d-flex justify-content-center pt-2 pb-2">
			
				<div class="row row-cols-1 row-cols-md-2 g-4" style = "background-color: #dcdff5">
	  				
					
					<div v-for="facility in facilities" v-on:click="showFacility(facility)" style = "background-color: #dcdff5">
						<div class="card h-100 cardHover" style="max-width: 540px; background-color: #a1d2e3; border-radius: 20px">
	  						<div class="row g-0">
	    						<div class="col-md-4">
	     		 					<img v-bind:src="facility.image" class="img-fluid rounded-start">
	    						</div>
							    <div class="col-md-8">
							      <div class="card-body pt-0">
									<div class="card-text">
										<small class="text-muted">{{facility.type}}<span class="float-end pt-1">{{facility.rating}} &#10029;</span></small>
									</div>
									<span class="float-end ps-2"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
							        <h5 class="card-title">{{facility.name}}</h5>
							        <p class="card-text">{{facility.location.address.street}}, {{facility.location.address.number}} {{facility.location.address.city}}, {{facility.location.address.country}}</p>
							      </div>
							    </div>
	  						</div>
						</div>
					</div>
				
				
			</div>
		
	
		
		</div>
	`, methods: {
		showFacility : function (facility) {
			window.location.href = "/#/facility?id=" + facility.name;
		},
		resetSearch : function (event) {
			this.searchName = '',
			this.searchLocation = '',
		    this.searchType = '',
		    this.searchRating = '',
			this.searchRestaurants();
		},
		searchFacilities : function (event) {
			this.refreshSearchHidden = !this.refreshSearchHidden;
			
				let searchParameters = {
						name : this.searchName,
						location : this.searchLocation,
	    				type : this.searchType,
	    				grade : this.searchRating			
    			}

    			axios 
		    		.post('/facilities/searchFacilities', JSON.stringify(searchParameters))
		    		.then(response => {
		    		   this.facilities = response.data;
						console.log(this.facilities)
		    	})
		},
		enterPressedSearch: function (event) {
			if (event.keyCode === 13) {
				this.searchFacilities();
			}
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
		}
	}, 
	mounted () {
		localStorage.clear();
		 	axios
          		.get('/facilities/getAll')
          		.then(response => {
					if (response.data != null) {
						this.facilities = response.data;
					}
				})
				.catch(error => {
					console.log(error.response)
				});
				
			axios
          		.get('/facilities/getAllTypes')
          		.then(response => {
					if (response.data != null) {
						this.facilityType = response.data;	
					}
				})
				.catch(error => {
					console.log(error.response)
				});
	}
});