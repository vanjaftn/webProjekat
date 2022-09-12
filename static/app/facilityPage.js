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
			comments: null,
			memberships: null,
			showTrainings: false,
			activeMembership: null,
			activeFacilityMembership: null,
			activeFacilityMembershipButton: false,
			changeButton:false,
			newMembership: null,
			errorMessage: '',
			commentContent:'',
			commentGrade:'',
		  	mode: ''
			
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
							<h4>Membership options</h4>
							<div class="single-training">
				         		<p><cite title="Source Title">Find the Membership That Fits You</cite></p>
								<div class="row row-cols-1 row-cols-md-3 g-4">
									
										<div v-for="membership in memberships" class="col">
										    <div class="card h-100">
											  <div class="card-header bgcolorheader">
													<h4 class="text-uppercase fw-bold">{{membership.name}}</h4>
											  </div>
										      <div class="card-body">
										        	<p>{{membership.description}}</p>
										      </div>
											  <ul class="list-group list-group-flush">
												<li class="list-group-item bgcolor">
													<h5 class="card-title">{{membership.price}} $ /per mo</h5>
										        	<p class="card-text">{{membership.appointmentNumber}} appointments</p>
												</li>
											  </ul>
										      <div v-if="role == 'CUSTOMER' " class="card-footer">
													
														<button v-if="activeFacilityMembershipButton || changeButton" v-on:click="switchMembership(membership)" type="button" class="btn btn-success">Switch</button>
														<button v-else v-on:click="buyMembership(membership)" type="button" class="btn btn-success">Buy</button>
													
										      </div>
										    </div>
										</div>
									
								</div>		
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

						<article v-if="showTrainings" class="article-content">
							<h4>
								New membership: {{this.newMembership.name}}
							</h4>
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
										<input type="radio" name = "sort" @change="SortByFacilityAsc($event)">
										<label style="color: black;">Facility name ascending</label></br>
										<input type="radio" name = "sort" @change="SortByFacilityDesc($event)">
										<label style="color: black;">Facility name descending</label></br>
										<button type="submit" v-on:click="sortTrainings" class="btn btn-primary">Sort</button>
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
							  <button v-if="this.role == 'CUSTOMER' " v-on:click="joinTraining(t.name)" class="btn btn-primary">Join</button>
							  
				            </div>
						  </article>
						  <article v-else class="article-content">
								
								<h4 v-for="am in activeMembership" v-if="am.facility == facility.name">
								Active Membership: {{am.id}} 
								</h4>
								
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
										<input type="radio" name = "price" @change="SortByDateAsc($event)">
										<label style="color: black;">Date descending</label></br>
										<input type="radio" name = "price" @change="SortByDateDesc($event)">
										<label style="color: black;">Date descending</label></br>
										<button type="submit" v-on:click="sortTrainings" class="btn btn-primary">Sort</button>
										</div>
							</div>

							<button v-if= "this.isManager == true" v-on:click="createTraining" class="btn btn-primary">Add new training</button>

							<div v-if="this.role == 'CUSTOMER'">
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
                                      <button v-on:click="joinTraining(t.name)" class="btn btn-primary">Join</button>
                                  </div>
                          
                            </div>
                              
                            <div v-else>
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
                            </div>
								
						  </article>
				
						<article class="article-button">
							<div>
								<button v-if="activeFacilityMembershipButton || changeButton" v-on:click="openCommentModal" type="button" class="btn btn-warning btn-lg" data-bs-toggle="modal" data-bs-target="#modalLogin">Comment and Rate </button>
							</div>	
					     </article>
						
					</section>
				</div>
			</div>
			
		<!-- ...................................................... COMMENT MODAL ............................................................. -->
					
			<div class="commentModal">
				<div class="modal fade" id="modalLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered modal-confirm ">
				    <div class="modal-content">
				      <div class="modal-header flex-column">				
						<h4 class="modal-title w-100">Comment and Rate</h4>					      
				      </div>
				      <div class="modal-body">
						<div class="mb-4">
						<div>
							<h5 class="float-start" style="color: #706161;">Rate <span class="pt-1">&#10029;</span></h5>
				        </div>
						<select v-model="commentGrade" class="form-select" id="commentRate">
		                    <option value="1">1</option>
		                    <option value="2">2</option>
		                    <option value="3">3</option>
		                    <option value="4">4</option>
		                    <option value="5">5</option>
						</select>
					</div>
 					<div class="mb-4">	
						<textarea v-model="commentContent" type="text" placeholder="Comment" class="form-control">
               			</textarea>
					</div>
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-info" data-bs-dismiss="modal">Cancel</button>
				        <button type="button" v-on:click="addComment" class="btn" data-bs-dismiss="modal">OK</button>
				      </div>
				    </div>
				  </div>
				</div> 
			</div>
	
			
		</div>
	`, methods: {
		addComment: function(event){
			
			let grade;
			if (this.commentGrade == '1') {
				grade = 1;
			} else if (this.commentGrade == '2') {
				grade = 2;
			} else if (this.commentGrade == '3') {
				grade = 3;
			} else if (this.commentGrade == '4') {
				grade = 4;
			}else if (this.commentGrade == '5') {
				grade = 5;
			} else {
				grade=0;
			}
			
	
				let comment = {
					user:this.user.username,
					facility : this.facility.name,
					content : this.commentContent,
					grade : grade, 
					status: 'PENDDING'
				}
			
			axios 
				.post('/comment/add/', JSON.stringify(comment))
				.then(response => {
					console.log("okej")
				})
				.catch(error => {
				    console.log(error)
				});
		},
		openCommentModal: function(event){
			document.querySelector(".commentModal");
		},
		buyMembership: function(event){
			this.changeButton = true
			this.showTrainings = true
			this.newMembership = event
			let customerMembership = {
				name: event.name,
				appointmentNumber: event.appointmentNumber,
				facility: event.facility,
				price: event.price
			}
			axios
				.post('/customer/addNewMembership', JSON.stringify(customerMembership))
				.then(response => {
					if(response.data == "")
					console.log(response.data)
				})
				.catch(error => {
					console.log(error)
				});
			
		},
		switchMembership: function(event){
			this.showTrainings = true
			this.newMembership = event
			let customerMembership = {
				name: event.name,
				appointmentNumber: event.appointmentNumber,
				facility: event.facility,
				price: event.price
			}
			
			axios
				.post('/customer/switchMembership', JSON.stringify(customerMembership))
				.then(response => {
					if(response.data == "")
					console.log(response.data)
				})
				.catch(error => {
					console.log(error)
				});
		},
	
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
		sortTrainings: function(event) {
		
			let sortParameters =
			{
				parameter : this.parameter,
				mode : this.mode,
				trainings : this.trainings,
				name : this.facility.name
			}
			
			axios
				.post('/sortTrainings', JSON.stringify(sortParameters))
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
		SortByDateDesc: function(){
			this.parameter = "date"
			this.mode = "desc"
		},
		SortByDateAsc: function(){
			this.parameter = "date"
			this.mode = "asc"
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
             
		axios
          	.get('/user/')
          	.then(response => {
			if (response.data != null) {
				this.user = response.data;
				
			}
			});
		axios
			.get('/memberships/getFacilityMemberships/' + window.localStorage.getItem('facilityId'))
			.then(response => {
				this.memberships = response.data
				
			})
			.catch(error => {
				console.log(error)
			})
		if(this.role == 'CUSTOMER')
		{			
		axios
			.get('/customer/getMembership')
			.then(response => {
				this.activeMembership = response.data
				
			})
			.catch(error => {
				console.log(error)
			})
		axios
			.get('/customer/getFacilityMembership/' + window.localStorage.getItem('facilityId'))
			.then(response => {
				if(response.data){
					this.activeFacilityMembership=response.data
					this.activeFacilityMembershipButton=true
					
				}				
			})
			.catch(error => {
				console.log(error)
			})
		}
	
	}
	
});