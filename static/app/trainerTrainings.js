Vue.component("trainerTrainings", {
	data: function () {
		return {
			jwt: window.localStorage.getItem('jwt'),
			role: window.localStorage.getItem('role'),
			trainings: {},
		  	trainer: {username:'', password:'', name:'', lastName:'', gender: {}, dateOfBirth: '', role:''},
		  	parameter: '',
		  	mode: '',
		  	facilityType: ''
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
										<input type="radio" name = "filter" @change="OnlyGymTrainingType($event)">
										<label style="color: black;">Gym</label></br>	
										<input type="radio" name = "filter" @change="OnlyPersonalTrainingType($event)">
										<label style="color: black;">Personal</label></br>	
										<input type="radio" name = "filter" @change="OnlyGroupTrainingType($event)">
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
										<input type="radio" name = "sort" @change="SortByPriceAsc($event)" >
										<label style="color: black;">Price ascending</label></br>
										<input type="radio" name = "sort" @change="SortByPriceDesc($event)">
										<label style="color: black;">Price descending</label></br>
										<input type="radio" name = "sort" @change="SortByFacilityAsc($event)">
										<label style="color: black;">Facility name ascending</label></br>
										<input type="radio" name = "sort" @change="SortByFacilityDesc($event)">
										<label style="color: black;">Facility name descending</label></br>
										<button type="submit" v-on:click="sortTrainings" class="btn btn-primary">Sort</button>
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
				.get('/getTrainerTrainings',
					{ params: {
						trainer: this.trainer.name
					}})
				.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
				})
		},
		OnlyGymTrainingType: function(event){
		
			axios
				.get('/getGymTrainingsTrainer',
					{ params: {
						trainer: this.trainer.name
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		OnlyPersonalTrainingType: function(event){
		
			axios
				.get('/getPersonalTrainingsTrainer',
					{ params: {
						trainer: this.trainer.name
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		OnlyGroupTrainingType: function(event){
		
			axios
				.get('/getGroupTrainingsTrainer',
					{ params: {
						trainer: this.trainer.name
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		OnlyGymFacilityType: function(event){
			axios
				.get('/getGymFacilityTrainingsTrainer',
					{ params: {
						trainer: this.trainer.name,
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
		})
		
		},
		OnlyDanceFacilityType: function(event){
			axios
				.get('/getDanceFacilityTrainingsTrainer',
					{ params: {
						trainer: this.trainer.name,
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
		})
		
		},
		OnlySportsFacilityType: function(event){
			axios
				.get('/getSportsFacilityTrainingsTrainer',
					{ params: {
						trainer: this.trainer.name,
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
		})
		
		},
		OnlyPoolFacilityType: function(event){
			axios
				.get('/getPoolFacilityTrainingsTrainer',
					{ params: {
						trainer: this.trainer.name,
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
				name : this.trainer.username
			}
			
			axios
				.post('/sortTrainingsTrainer', JSON.stringify(sortParameters))
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
				.get('/getTrainer',
					{params:{
						jwt: this.jwt
					}})
				.then(response => {
					this.trainer = response.data
					
					this.getTrainings()
					console.log(this.trainer)
				
				})
		
	}
	
});