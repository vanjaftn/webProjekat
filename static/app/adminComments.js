Vue.component("admin-comments" , {
	data: function () {
		return {
			comments: null,
		}
	},
	template: `
		<div id="adminComments">
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
							        <div v-if="comment.status == 'PENDDING'">
										<button v-on:click="approveComment(comment)" type="button" class="btn btn-success">Approve</button>
										<button v-on:click="rejectComment(comment)" type="button" class="btn btn-danger">Reject</button>
									</div>
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
		approveComment: function(event){
			axios
				.put('/comment/approveComment/' + event.id)
				.then(response => {
					this.comments = response.data
				})
				.catch(error => {
					console.log(error)
				})
		},
		rejectComment: function(event){
			axios
				.put('/comment/rejectComment/' + event.id)
				.then(response => {
					this.comments = response.data
				})
				.catch(error => {
					console.log(error)
				})
		},		
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