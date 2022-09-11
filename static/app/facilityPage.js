Vue.component("f-page", {
	data: function () {
		return {
			facility: {name:'', type: '', contentType: {}, status: {}, image: '', location: {latitude:'', longitude:'', address:{street:'', city:'', number:'', country:''}}, businessHours: {},  rating: 0.0},
			jwt: window.localStorage.getItem('jwt'),
			role: window.localStorage.getItem('role'),
			isManager: false,
			trainings: {},
			sortingMode: '',
			isCustomer: false,
			trainingId: '',
			alreadyJoined: false,
		  	customer: window.localStorage.getItem("customerUsername"),
			user: null,
			comments: null
		}
	}, 
	template: `
		<div id="facilityPage">
			<navbar/>
			
			<div class="page">
				<div class="facility-page pt-5">
					<section class="facility-hero">
						<img v-bind:src="facility.image" class="img facility-hero-img" />
						<article>
							<h2>{{facility.name}}</h2>
							<p>{{facility.location.address.street}}, {{facility.location.address.number}} {{facility.location.address.city}}, {{facility.location.address.country}}</p>
							<div class="facility-icons">
								<article class="facility-info">
									<i class="fa fa-clock-o"></i>
									<h5>Status:</h5>
									<p>{{facility.status}}</p>
								</article>
								<article class="facility-info">
									<i class="fa fa-star"></i>
									<h5>Rate:</h5>
									<p>{{facility.rating}}</p>
								</article>
								<article class="facility-info">
									<i class="fa fa-building-o"></i>
									<h5>Type:</h5>
									<p>{{facility.type}}</p>
								</article>
							</div>
							<div class="facility-tags">
								Tags: <a href="">{{facility.contentType}}</a>
							</div>
						</article>
					</section>
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

							<button v-if= "this.isManager == true" v-on:click="createTraining" class="btn btn-primary">Add new training</button>
							<div class="single-training" v-for="t in trainings">
				              <header>
				                <p>{{t.name}}</p>
				                <div>
				                </div>
				              </header>
				              <p><label>Description: </label>{{t.description}}</p>
							  <p><label>Trainer: </label>{{t.trainer}}</p>
							  <p><label>Price: </label>{{t.price}}</p>
							  <img v-bind:src="t.picture" class="img facility-hero-img" />
							  <br></br>
							  <button v-on:click="joinTraining(t.name)" class="btn btn-primary">Join</button>
							  
				            </div>
						  </article>
						<article class=" article-content second-column">
							<h4>Comments:</h4>
							<div v-for="comment in comments">
								<div class="card">
									  <div class="card-header">
									    {{comment.user}}
									  </div>
									  <div class="card-body">
									    <blockquote class="blockquote mb-0">
									      <p>{{comment.content}}</p>
									    </blockquote>
									  </div>
								</div>
							</div>
					     </article>
						
					</section>
				</div>
			</div>
			
		</div>
	`, methods: {
		createTraining:function(event){
			router.push("/newTraining")
		},
		joinTraining:function(training){
		
		console.log(this.customer)
		    let Parameters =
		    {
		    	customerUsername : this.customer,
		    	trainingName : training
		    }
		
			axios
				.post('/joinTraining', JSON.stringify(Parameters))
					.then(response =>{
						console.log(response.data)
					})
		},
		OnlyGymTrainingType: function(event){
		
			axios
				.get('/getGymTrainings',
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
				.get('/getPersonalTrainings',
					{ params: {
						facility: this.facility.name
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		OnlyGroupTrainingType: function(event){
		
			axios
				.get('/getGroupTrainings',
					{ params: {
						facility: this.facility.name
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		SortByPriceAsc: function() {
			
			axios
				.get('/sortTrainingsByPriceAsc',
					{ params: {
						facility: this.facility.name
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		SortByPriceDesc: function() {
			
			axios
				.get('/sortTrainingsByPriceDesc',
					{ params: {
						facility: this.facility.name
					}})
					.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
			})
		},
		checkIfManager: function(){
		if(this.role=='MANAGER')
		{
        	axios
				.get('/getManager',
	                { params : {
	                  jwt: this.jwt
	                }})
				.then(response => {
					var facilityName = response.data.facility;
				
				if(facilityName == this.facility.name)
					this.isManager = true
					
					console.log(this.isManager)
				})
		}
		},
		getCustomer: function(){
			if(this.role=='CUSTOMER')
			this.isCustomer = true
		},
		getTrainings: function() {
			axios
				.get('/getFacilityTrainings',
					{ params: {
						facility: this.facility.name
					}})
				.then(response => {
					this.trainings = response.data
					console.log(this.trainings)
				})
		}
		
	}, 
	mounted () {
		console.log(this.jwt)
		console.log(this.role)
		
		axios
			.get("oneFacility/",
            { params : {
                facilityName : window.localStorage.getItem('facilityId')
             }})
             .then(response => {
             this.facility = response.data
             this.checkIfManager()
             this.getCustomer()
             
             this.getTrainings()
             
             })
       axios
			.get('/comments/getApprovedComments/' + window.localStorage.getItem('facilityId'))
			.then(response => {
				this.comments = response.data
			})
			.catch(error => {
				console.log(error)
			})
             
			
        
	}
	
});