Vue.component("home-page", {
	data: function () {
		return {
			facilities: null,
			facilityType: null,
			searchName: '',
			searchLocation: '',
		    searchType: '',
		    searchRating: '',
			refreshSearchHidden: true,
			isLoginDisabled: false,
			passwordShow: false,
			sortParameter: '',
			sortMode: '',
			role : window.localStorage.getItem('role'),
	      	jwt: window.localStorage.getItem('jwt'),
	      	isTrainer: false
	      	
		}
	}, 	
	template:`  
		<div id="home">
			<navbar/>
			<!-- .............................................SEARCH ..............................................................................-->		
	
	
			<div class="container row gx-3 gy-8 align-items-center search-box flex-lg-nowrap">
				
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
					    <button type="submit" v-on:click="searchRestaurants" class="btn btn-primary">Search</button>
				    </div>
				    
				
			</div>
			
			<div v-if="!refreshSearchHidden" class="container refreshSearch row justify-content-end">
		 		<div class="col-sm-3">
					<button v-on:click="resetSearch" class="btn btn-outline-primary">Reset Search</button>
				</div>
		
			</div>
<!-- .............................................FILTER FACILITIES ..............................................................................-->		
			<div class = "container align-items-left search-box flex-lg-nowrap">
				<div class = "row" style="max-width: 375px;background-color: #a1d2e3; border-radius: 20px">
					<div class = "col-auto">
						<input type="checkbox" @change="showOnlyOpenedFacilities($event)">
						<label style="color: black;">Opened facilities</label></br>					
					</div>
				</div>
			</div>
<!-- .............................................SORT FACILITIES ..............................................................................-->		
			
			<div class = "container row gx-2 gy-5 align-items-center search-box flex-lg-nowrap">
				<div class = "row" style="max-width: 375px; background-color: #a1d2e3; border-radius: 20px">
					
					<div class = "col-auto">
						<input type="radio" name = "sortBy" @change="setNameAsSortParameter($event)">
						<label style="color: black;"> Name</label><br/>
					</div>
					<div class = "col-auto">
						<input type="radio" name = "sortBy" @change="setLocationAsSortParameter($event)">
						<label style="color: black;"> Location</label><br/>
					</div>
					<div class = "col-auto">
						<input type="radio" name = "sortBy" @change="setGradeAsSortParameter($event)">
						<label style="color: black;"> Grade</label><br/>
					</div>
					<div class = "col-auto">
						<button type="submit" v-on:click="sortFacilities" class="btn btn-primary">Sort</button>
					</div>
					<div class = "col-auto">
						<input type="radio" name = "sortAs" @change="setAscSortMode($event)">
						<label style="color: black;">Ascending</label></br>
					</div>
					<div class = "col-auto">
						<input type="radio" name = "sortAs" @change="setDescSortMode($event)">
						<label style="color: black;">Descending</label></br>
					</div>
					<div class = "col-auto">
						<button type="submit" v-on:click="sortFacilities" class="btn btn-primary">Sort</button>
					</div>
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
    	</div>

	`, methods: {	
		checkIfTrainer: function(){
			if(this.role == 'TRAINER')
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
		},
		showFacility : function (facility) {
			window.location.href = "/#/facility?id=" + facility.name;
			localStorage.setItem("facilityId", facility.name)
			router.push('/singleFacility')
		},
		resetSearch : function (event) {
			this.searchName = '',
			this.searchLocation = '',
		    this.searchType = '',
		    this.searchRating = '',
			this.searchRestaurants();
		},
		searchRestaurants : function (event) {
			this.refreshSearchHidden = !this.refreshSearchHidden;
			
				let searchParameters = {
						name : this.searchName,
						location : this.searchLocation,
	    				type : this.searchType,
	    				grade: this.searchRating			
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
				this.searchRestaurants();
			}
		},
		setAscSortMode: function(event){
			this.sortMode = 'asc';
		},
		setDescSortMode: function(event){
			this.sortMode = 'desc';
		},		
		setNameAsSortParameter: function(event){
			this.sortParameter = 'name';
		},
		setLocationAsSortParameter: function(event){
			this.sortParameter = 'location';
		},
		setGradeAsSortParameter: function(event){
			this.sortParameter = 'rating';
		},
		sortFacilities: function(event){
		
			let sortParameters =
			{
				parameter : this.sortParameter,
				mode : this.sortMode
			}
			
			axios
				.post('/facilities/sortFacilities', JSON.stringify(sortParameters))
		    		.then(response => {
		    		   this.facilities = response.data;
		    		   console.log(this.facilities);
		    	})
		},
		showOnlyOpenedFacilities: function(event){
			
			axios
				.get('/facilities/openedFacilities')
					.then(response => {
						if(response.data != null){
							this.facilities = response.data;
						}
					})
		}
		
	}, 
	mounted () {
		console.log(this.jwt)
		console.log(this.role)
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