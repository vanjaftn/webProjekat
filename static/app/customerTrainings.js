Vue.component("customerTrainings", {
	data: function () {
		return {
			jwt: window.localStorage.getItem('jwt'),
			role: window.localStorage.getItem('role'),
			searchName: '',
			trainings: {},
			trainingsHistory: {},
			parameter: '',
			mode: '',
		  	customer: {username:'', password:'', name:'', lastName:'', gender: {}, dateOfBirth: '', role:'', points: 0, customerType: {}, membership: {}}
		}
	}, 
	template: `
		<div id="facilityPage">
			<navbar/>
			
			<div class="page">
				<div class="facility-page pt-5">
					<section class="facility-content">
						<article class="article-content">
							<h4>Trainings</h4>
<!-- .............................................FILTER TRAININGS ..............................................................................-->
									<div class = "row" style="max-width: 800px;background-color: #a1d2e3; border-radius: 20px">
									<div class = "col-auto">
										<label style="color: black;">Filter by training type</label></br>	
										<input type="radio" name = "trainingType" @change="OnlyGymTrainingType($event)">
										<label style="color: black;">Gym</label></br>	
										<input type="radio" name = "trainingType" @change="OnlyPersonalTrainingType($event)">
										<label style="color: black;">Personal</label></br>	
										<input type="radio" name = "trainingType" @change="OnlyGroupTrainingType($event)">
										<label style="color: black;">Group</label></br>
										<label style="color: black;">Filter by facility type</label></br>
										<input type="radio" name = "filter" @change="OnlyGymFacilityType($event)">
										<label style="color: black;">Gym</label></br>	
										<input type="radio" name = "filter" @change="OnlyDanceFacilityType($event)">
										<label style="color: black;">Dance Studio</label></br>	
										<input type="radio" name = "filter" @change="OnlySportsFacilityType($event)">
										<label style="color: black;">Sports Facility</label></br>	
										<input type="radio" name = "filter" @change="OnlyPoolFacilityType($event)">
										<label style="color: black;">Pool</label></br>	
													
								</div>
<!-- .............................................SORT TRAININGS..............................................................................-->
								<div class = "col-auto">
										<label style="color: black;">Sort by</label></br>
										<input type="radio" name = "price" @change="SortByPriceAsc($event)" >
										<label style="color: black;">Price ascending</label></br>
										<input type="radio" name = "price" @change="SortByPriceDesc($event)">
										<label style="color: black;">Price descending</label></br>
										<input type="radio" name = "sort" @change="SortByFacilityAsc($event)">
										<label style="color: black;">Facility name ascending</label></br>
										<input type="radio" name = "sort" @change="SortByFacilityDesc($event)">
										<label style="color: black;">Facility name descending</label></br>
										<button type="submit" v-on:click="sortTrainings" class="btn btn-primary">Sort</button>
										
										</div>
<!-- .............................................SEARCH ..............................................................................-->		
								<div class = "col-auto">
							    		<input v-model="searchName" v-on:keyup="enterPressedSearch" type="text" class="form-control" id="facilitiName" placeholder="Name...">
							  		
							    <button type="submit" v-on:click="searchFacilities" class="btn btn-primary">Search</button>
								</div>
							</div>
				            <div class="single-training" v-for="th in trainingsHistory">
							<div class="single-training" v-for="t in trainings">
				              <header>
				                <p>{{t.name}}</p>
				                <div></div>
				              </header>
							  <p><label>Facility: </label>{{t.sportsFacility}}</p>
				            <p><label>Application date: </label>{{th.applicationDate.date.day}}.{{th.applicationDate.date.month}}.{{th.applicationDate.date.year}}</p>
							  <img v-bind:src="t.picture" class="img facility-hero-img" />
							  
				            </div>
				            </div>
						  </article>
						
					</section>
				</div>
			</div>
			
		</div>
	`, methods: {
		getTrainings: function(){
			axios
				.get('/getCustomerTrainings',
					{ params: {
						customer: this.customer.username
					}})
				.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
				})
		},
		getTrainingsHistory: function(){
			axios
				.get('/getCustomerTrainingsHistory',
					{ params: {
						customer: this.customer.username
					}})
				.then(response => {
					this.trainingsHistory = response.data
					console.log(this.trainingsHistory)
				})
		},
		enterPressedSearch: function (event) {
			if (event.keyCode === 13) {
				this.searchFacilities();
			}
		},
		searchFacilities : function (event) {
			
				let searchParameters = {
						name : this.searchName,
						trainings : this.trainings		
    			}

    			axios 
		    		.post('/searchTrainings', JSON.stringify(searchParameters))
		    		.then(response => {
		    		   this.trainings = response.data;
						console.log(this.trainings)
		    	})
		},
		OnlyGymFacilityType: function(event){
			axios
				.get('/getGymFacilityTrainingsCustomer',
					{ params: {
						customer: this.customer.username,
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
		})
		
		},
		OnlyDanceFacilityType: function(event){
			axios
				.get('/getDanceFacilityTrainingsCustomer',
					{ params: {
						customer: this.customer.username,
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
		})
		
		},
		OnlySportsFacilityType: function(event){
			axios
				.get('/getSportsFacilityTrainingsCustomer',
					{ params: {
						customer: this.customer.username,
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
		})
		
		},
		OnlyPoolFacilityType: function(event){
			axios
				.get('/getPoolFacilityTrainingsCustomer',
					{ params: {
						customer: this.customer.username,
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
		})
		
		},
		OnlyGymTrainingType: function(event){
		
			axios
				.get('/getGymTrainingsCustomer',
					{ params: {
						customer: this.customer.username
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		OnlyPersonalTrainingType: function(event){
		
			axios
				.get('/getPersonalTrainingsCustomer',
					{ params: {
						customer: this.customer.username
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		OnlyGroupTrainingType: function(event){
		
			axios
				.get('/getGroupTrainingsCustomer',
					{ params: {
						customer: this.customer.username
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		sortTrainings: function(event) {
		
			
			let sortParameters =
			{
				parameter : this.parameter,
				mode : this.mode,
				trainings : this.trainings,
				name : this.customer.username
			}
			
			axios
				.post('/sortTrainingsCustomer', JSON.stringify(sortParameters))
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		SortByPriceAsc: function() {
			this.parameter = "price"
			this.mode = "asc"
		},
		SortByPriceDesc: function() {
			this.parameter = "price"
			this.mode = "desc"
		},
		SortByFacilityAsc: function() {
			
			this.parameter = "facility"
			this.mode = "asc"
		},
		SortByFacilityDesc: function() {
			
			this.parameter = "facility"
			this.mode = "desc"
		}
		
	}, 
	mounted () {
		console.log(this.jwt)
		console.log(this.role)
        
        axios
				.get('/getCustomer',
					{params:{
						jwt: this.jwt
					}})
				.then(response => {
					this.customer = response.data
					
					console.log(this.customer)
					this.getTrainings()
					this.getTrainingsHistory()
				
				})
	}
	
});