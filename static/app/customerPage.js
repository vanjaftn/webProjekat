Vue.component("customer-page", {
	data: function () {
		return {
			username: '',
			facilities: null,
			facilityType: null,
			searchName: '',
			searchLocation: '',
		    searchType: '',
		    searchRating: '',
			refreshSearchHidden: true,
			filterOpen: "",
			facilityList: null,	
			sortParameter: '',
			sortMode: '',		
		}
	}, 
	template: `
		<div id="customerPage">
			
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
						<li class=nav-item>
							<a class="nav-link ms-3 pointer" v-on:click="customerProfilePage"><i class="fa fa-user me-1" aria-hidden="true"></i>Profile</a>
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
		<!--	<div>		
					<input type="radio" @change="showOnly($event)">
			   	    <label style="color: darkgrey;" > Facility Type</label><br/>
			    </div>
		-->		<div>
				    <input type="radio"  @change="showOnlyOpend($event)"  id="open" name="filterOpen" value="open" v-model="filterOpen">
			        <label style="color: darkgrey;" > Open</label><br/>
			    </div>
				
				<div class="float-end text-end me-2 mb-1">
					<button v-if="filterOpen" v-on:click="filterReset" class="btn btn-outline-primary"> Reset </button>
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
					    <input type="radio" @change="setLocationAsSortParameter($event)" name="sort">
		       		 	<label style="color: darkgrey;"> Location </label>
		       	 	</div>
					<div class=" col-auto">
					    <input type="radio" @change="setRatingAsSortParameter($event)" name="sort">
		        		<label style="color: darkgrey;"> Rating</label>
		        	</div>
					<hr class="bg-danger border-2 border-top border-danger ms-2">
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
					<button type="submit" class="btn btn-primary " v-on:click="sortFacilities">Sort</button>
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
						    <input type="radio"  @change="showOnlyOpend($event)"  id="open2" name="filterOpen" value="open2" v-model="filterOpen">
					        <label style="color: darkgrey;" > Open</label><br/>
					    </div>
						<div class="float-end text-end me-2 mb-1">
							<button v-if="filterOpen" v-on:click="filterReset" class="btn btn-outline-primary"> Reset </button>
						</div>  
					</div></li>
					<li><hr class="dropdown-divider"></li>
				    <li><div class="dropdown-item">
						Sort
						<div class=" col-auto ">		
							<input type="radio" @change="setNameAsSortParameter($event)" name="sort">
			        		<label style="color: darkgrey;"> Name</label>
			        	</div>
						<div class=" col-auto ">
						    <input type="radio" @change="setLocationAsSortParameter($event)" name="sort">
			       		 	<label style="color: darkgrey;"> Location </label>
			       	 	</div>
						<div class=" col-auto">
						    <input type="radio" @change="setRatingAsSortParameter($event)" name="sort">
			        		<label style="color: darkgrey;"> Rating</label>
			        	</div>
						<hr class="bg-danger border-2 border-top border-danger ms-2">
						<div class=" col-auto ">		
								<input type="radio" @change="setDescendingSortMode($event)" name="sortD">
			        			<label style="color: darkgrey;"> Descending</label>
				        </div>
						<div class=" col-auto">
						  	<input type="radio" @change="setAscendingSortMode($event)" name="sortD">
				        	<label style="color: darkgrey;" > Ascending</label>
				        </div>   
					</div></li>
				    <li><div class="dropdown-item" >
						<button type="submit" class="btn btn-primary " v-on:click="sortFacilities">Sort</button>
					</div></li>
				  </ul>
				</div>
			</div>
		
				


<!-- .............................................SEARCH ..............................................................................-->		
	
	
			<div class="container row gx-3 gy-2 align-items-center search-box flex-lg-nowrap">
				
			  		<div class="col-sm-3">
			    		<input v-model="searchName" v-on:keyup="enterPressedSearch" type="text" class="form-control" id="facilitiName" placeholder="Text...">
			  		</div>
			  		<div class="col-sm-3">
						<input v-model="searchLocation" v-on:keyup="enterPressedSearch" type="text" class="form-control" placeholder="Location...">
		  			</div>
			  		<div class="col-sm-3">
			   			<select v-model="searchType" class="form-select" id="typeS">
							<option value="" selected disabled>Type</option>
							<option v-for="type in facilityType" v-bind:value="type">
								 {{type}}
							</option>
			    		</select>
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
			
			<div v-if="searchName || searchLocation || searchType || searchRating" class="container refreshSearch row justify-content-end">
		 		<div class="col-sm-3">
					<button v-on:click="resetSearch" class="btn btn-outline-primary">Reset Search</button>
				</div>
			</div>
			
<!-- .............................................FACILITIES VIEW ..............................................................................-->		

			
			<div class="container result-box d-flex justify-content-center pt-2 pb-2">
			
				<div class="row row-cols-1 row-cols-md-2 g-4  fit-one" style = "background-color: #dcdff5">
	  				
					
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
				

		</div>
	`, methods: {
		showOnlyOpend : function (event) {
			let sortParameters = {
				facilities: this.facilities
			}
			
			axios
				.post('/facilities/getOpenedFacilities', JSON.stringify(sortParameters))
				.then(response => {
					if(response.data != null) {
						this.facilities= response.data;
						console.log(this.users)
					}
				})
				.catch(error => {
					console.log(error)
				});	
		},
		sortFacilities : function (event) {
			let sortParameters = {
					mode : this.sortMode,
					parameter : this.sortParameter,
					facilities: this.facilities
    			}
				axios 
		    		.post('/facilities/sortFacilities', JSON.stringify(sortParameters))
		    		.then(response => {
		    		   this.facilities = response.data;
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
		
		setLocationAsSortParameter : function (event) {
			this.sortParameter = 'location';
		},
		
		setRatingAsSortParameter : function (event) {
			this.sortParameter = 'rating';
		},
		filterReset: function(event) {
			this.filterOpen = "";
			this.facilities = this.facilityList;
		},
		customerProfilePage : function(event) {
			window.location.href = "/#/customerProfile"
		},
		showFacility : function (facility) {
			window.location.href = "/#/facility?id=" + facility.name;
		},
		resetSearch : function (event) {
			this.searchName = '',
			this.searchLocation = '',
		    this.searchType = '',
		    this.searchRating = '',
			this.filterReset();
		},
		searchFacilities : function (event) {
			
			
				let searchParameters = {
						name : this.searchName,
						location : this.searchLocation,
	    				type : this.searchType,
	    				grade : this.searchRating,
						facilities: this.facilities				
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
						this.facilityList = response.data;
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