Vue.component("customerTrainings", {
	data: function () {
		return {
			jwt: window.localStorage.getItem('jwt'),
			role: window.localStorage.getItem('role'),
			trainings: {},
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
									<div class = "row" style="max-width: 400px;background-color: #a1d2e3; border-radius: 20px">
									<div class = "col-auto">
										<label style="color: black;">Filter by training type</label></br>	
										<input type="radio" name = "trainingType" @change="OnlyGymTrainingType($event)">
										<label style="color: black;">Gym</label></br>	
										<input type="radio" name = "trainingType" @change="OnlyPersonalTrainingType($event)">
										<label style="color: black;">Personal</label></br>	
										<input type="radio" name = "trainingType" @change="OnlyGroupTrainingType($event)">
										<label style="color: black;">Group</label></br>	
													
								</div>
<!-- .............................................SORT TRAININGS..............................................................................-->
								<div class = "col-auto">
										<label style="color: black;">Sort by</label></br>
										<input type="radio" name = "price" @change="SortByPriceAsc($event)" >
										<label style="color: black;">Price ascending</label></br>
										<input type="radio" name = "price" @change="SortByPriceDesc($event)">
										<label style="color: black;">Price descending</label></br>
										</div>
							</div>
							<div class="single-training" v-for="t in trainings">
				              <header>
				                <p>{{t.name}}</p>
				                <div>
				                </div>
				              </header>
				              <p><label>Description: </label>{{t.description}}</p>
							  <p><label>Price: </label>{{t.price}}</p>
							  <p><label>Facility: </label>{{t.sportsFacility}}</p>
							  <img v-bind:src="t.picture" class="img facility-hero-img" />
							  
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
						customer: this.customer.name
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
						facility: this.facility.name
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
						customer: this.customer.name
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
						customer: this.customer.name
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		SortByPriceAsc: function() {
			
			axios
				.get('/sortTrainingsByPriceAscCustomer',
					{ params: {
						customer: this.customer.name
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		SortByPriceDesc: function() {
			
			axios
				.get('/sortTrainingsByPriceDescCustomer',
					{ params: {
						customer: this.customer.name
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		}
		
	}, 
	mounted () {
        
        axios
				.get('/getCustomer',
					{params:{
						jwt: this.jwt
					}})
				.then(response => {
					this.customer = response.data
					
					console.log(this.customer)
					this.getTrainings()
				
				})
	}
	
});