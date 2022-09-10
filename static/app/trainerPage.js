Vue.component("trainer-page", {
	data: function () {
		return {
			username: ''		
		}
	}, 
	template: `
		<div id="trainerPage">
			<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
				  <div class="container-fluid">
				    <a class="navbar-brand" >LOGO</a>
				    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				      <span class="navbar-toggler-icon"></span>
				    </button>
				    <div class="collapse navbar-collapse" id="navbarSupportedContent">
				      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
				        <li class="nav-item">
				          <a class="nav-link active">Home</a>
				        </li>
				      </ul>
					  <ul class="navbar-nav">
						<li class=nav-item>
							<a class="nav-link ms-3 pointer" v-on:click="trainerProfile"><i class="fa fa-user me-1" aria-hidden="true"></i>Profile</a>
						</li>
						<li class=nav-item>
							<a class="nav-link ms-3 pointer" v-on:click="logout"><i class="fa fa-sign-out me-1" aria-hidden="true"></i>Log out</a>
						</li>
					  </ul>
				    </div>
				  </div>
				</nav>
			<div>
				Hello trainer		
			</div>
		</div>
	`, methods: {
		trainerProfile : function(event) {
			window.location.href = "/#/trainerProfile"
		},
		logout: function (event) {
			localStorage.clear();
			window.location.href = "#/";
		}
	}, 
	mounted () {}
});