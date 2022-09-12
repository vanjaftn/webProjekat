Vue.component("manager-comments" , {
	data: function () {
		return {
			comments: null,
			manager: null,
		}
	},
	template: `
		<div id="managerTrainerComments">
			<navbar/>
				
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
				
			})
			.catch(error => {
				console.log(error)
			})
			axios
				.get('/manager/')
				.then(response => {
					this.manager = response.data
					
					axios
						.get('/comments/getCommentsManager/' + response.data.facility)
						.then(response => {
							this.comments=response.data
							console.log(response.data)
						})
						.catch(error => {
							console.log(error)
						})
				
				})
	}
});