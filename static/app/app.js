const HomePage = { template: '<home-page></home-page>' }
const FacilityPage = { template: '<f-page></f-page>' }
const Login = { template: '<login-page></login-page>' }
const Register = { template: '<register-page></register-page>' }
const CustomerProfilePage = { template: '<customer-profile-page></customer-profile-page>' }
const Users = { template: '<usersList-page></usersList-page>' }
const NewFacility = { template: '<newFacility-page></newFacility-page>' }
const NewManager = { template: '<newManager-page></newManager-page>' }
const NewTrainer = { template: '<newTrainer-page></newTrainer-page>' }
const Navbar = {template: '<navbar></navbar>'}
const NewTraining = {template: '<newTraining></newTraining>'}
const TrainerTrainings = {template: '<trainerTrainings></trainerTrainings>'}
const CustomerTrainings = {template: '<customerTrainings></customerTrainings>'}
const AdminComments = { template: '<admin-comments></admin-comments>' }
const ManagerTrainerComments = { template: '<manager-trainer-comments></manager-trainer-comments>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: HomePage},
		{ path: '/login', component: Login},
		{ path: '/register', component: Register},
		{ path: '/usersProfileView', component: Users},
		{ path: '/newFacility', component: NewFacility},
		{ path: '/newManager', component: NewManager},
		{ path: '/newTrainer', component: NewTrainer},
		{ path: '/customerProfile', component: CustomerProfilePage},
		{ path: '/singleFacility', component: FacilityPage},
		{ path: '/newTraining', component: NewTraining},
		{ path: '/trainerTrainings', component: TrainerTrainings},
		{ path: '/customerTrainings', component: CustomerTrainings},
		{ path: '/adminComments', component: AdminComments},
		{ path: '/comments', component: ManagerTrainerComments}		
	  ]
});

var app = new Vue({
	router,
	el: '#webApp'
});

