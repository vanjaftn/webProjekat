Vue.component("manager-trainer-comments" , {
	data: function () {
		return {
			comments: null,
		}
	},
	template: `
		<div id="managerTrainerComments">
			<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
				  <div class="container-fluid">
				    <a class="navbar-brand" >LOGO</a>
				    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				      <span class="navbar-toggler-icon"></span>
				    </button>
				    <div class="collapse navbar-collapse" id="navbarSupportedContent">
				      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
				        <li v-on:click="" class="nav-item">
				          <a class="nav-link active pointer">Home</a>
				        </li>
				      </ul>
					  <ul class="navbar-nav">
						<li class=nav-item>
							<a v-on:click="commentsView" class="nav-link ms-3 pointer"><i class="fa fa-comments me-1" aria-hidden="true"></i>Comments</a>
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
				
				<!-- ................................ COMMENTS ...................................... -->
				
				<div class="container result-box-comments-heading d-flex justify-content-center pt-2 pb-2">
					<p class="fw-bold fs-3">Comments</p>
				</div>

				
				
				<div class="container result-box-comments pt-2 pb-2">
						
					<div class="row row-cols-1 row-cols-md-3 g-4">
						<div v-for="comment in comments">
							<div class="col">
							    <div class="card h-100">
								  <div class="card-header">
										<small class="text-muted">{{comment.user}}</small>
								  </div>
							      <div class="card-body">
							        <h5 class="card-title">{{comment.facility}}</h5>
							        <p class="card-text">{{comment.content}}</p>
							      </div>
								  <ul class="list-group list-group-flush">
									<li class="list-group-item">Rating: {{comment.grade}} <i class="fa fa-star"></i></li>
								  </ul>
							      <div class="card-footer">
									<h5 v-if="comment.status == 'APPROVED'" class="fw-bold text-success">APPROVED</h5>
	                            	<h5 v-if="comment.status == 'REJECTED'" class="fw-bold text-danger">REJECTED</h5>
							      </div>
							    </div>
							</div>
						</div>
					</div>						
				</div>
				
				
		</div>
	`,
	methods: {
		
		commentsView: function (event) {
			window.location.href = "#/comments"
		},
		
		profilePage: function (event) {
			window.location.href = "#/profile";
		},
		logout: function (event) {
			localStorage.clear();
			window.location.href = "#/";
		}
		
	} 
	,
	mounted() {
		axios
			.get('/comments/allComments/')
			.then(response => {
				this.comments = response.data	
			})
			.catch(error => {
				console.log(error)
			})
	}
});