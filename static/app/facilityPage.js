Vue.component("f-page", {
	data: function () {
		return {
			facility: {name:'', type: '', contentType: {}, status: {}, image: '', location: {latitude:'', longitude:'', address:{street:'', city:'', number:'', country:''}}, businessHours: {},  rating: ""}		,
			jwt: window.localStorage.getItem('jwt'),
			role: window.localStorage.getItem('role'),
			isManager: false,
			trainings: {},
			sortingMode: ''
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
							  
				            </div>
						  </article>
						<article class="second-column">
				            <div class="second-column-content">
				              <h4>Coment</h4>
				              <p class="single-comment">comment</p>
				              <p class="single-comment">commnet</p>
				              <p class="single-comment">comment</p>
				            </div>
				            <div class="second-column-content">
				              <h4>Comment</h4>
				              <p class="single-tool">comm</p>
				              <p class="single-tool">ko</p>
				              <p class="single-tool">loo</p>
				              <p class="single-tool">ko</p>
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
		
        	axios
				.get('/getManager',
	                { params : {
	                  jwt: this.jwt
	                }})
				.then(response => {
					var facilityName = response.data.facility;
				
				if(facilityName == this.facility.name)
					this.isManager = true;
					
					console.log(this.isManager)
				})
		},
		
		getTrainings: function(){
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
		axios
			.get("oneFacility/",
            { params : {
                facilityName : window.localStorage.getItem('facilityId')
             }})
             .then(response => {
             this.facility = response.data
             this.checkIfManager()
             this.getTrainings();
             })
             
         
             
        
	}
	
});