var app = angular.module("route", ['ngRoute', 'ngCookies']);


app.config(function($routeProvider) {
	$routeProvider
	.when('/login', {
		templateUrl: 'login.html',
		controller: 'LoginController'
	})
	.when('/', {
		templateUrl: 'landing.html',
		controller: 'LandingController'
	})
	.when('/edit/:user?', {
		templateUrl: 'edit.html',
		controller: 'EditController'
	})
	.when('/view/:user', {
		templateUrl: 'view.html',
		controller: 'ViewController'
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.factory('userdata', ['$cookieStore', function($cookieStore) {
	var users = [];
//	var curUser;
	var curUser = $cookieStore.get('user');//Curent user
	//var users = $cookieStore.get('users');

	return {
		setCur: function(realname,quote) {
			users[curUser] = {realname: realname, quote: quote};
		},
		get: function(user){
			return users[user];
		},
		getCur: function(){
			return users[curUser];
		},
		setUser: function(user){
			curUser = user;
			$cookieStore.put('user',user);
		},
		getUser: function(){
			return curUser;
		}};
}]);

app.controller('MainController', function($scope, $routeParams) {
	$scope.name = "LandingController";
	$scope.params = $routeParams;
});

app.controller('LandingController', ['$scope', 'userdata', function($scope, userdata) {
	if((userdata.getUser()) != undefined){//logged in
		$scope.message = "Win " + userdata.getUser();
	}else{
		$scope.notLoggedIn = true;
	}
}]);

app.controller('LoginController', ['$scope', 'userdata', '$location', function($scope, userdata, $location) {
	$scope.name;
	$scope.login = function(){
		userdata.setUser($scope.name);
		$location.url('/edit/' + $scope.name);
	};
}]);
app.controller('EditController', ['$scope', 'userdata', '$location', '$routeParams',
		function($scope, userdata, $location, $routeParams) {
	if((userdata.getUser()) == undefined){//Not logged in
		alert("Not logged in");
		$location.url('/');
	}else if($routeParams.user == undefined){
		$location.url('/edit/' + userdata.getUser());
	}else if(userdata.getUser() != $routeParams.user){
		$location.url('/');
	}else{
		$scope.realname;
		$scope.quote;

		var data = userdata.getCur();
		if(data != undefined){
			$scope.realname = data.realname;
			$scope.quote = data.quote;
		}

		$scope.save = function(){
			userdata.setCur($scope.realname, $scope.quote);
			$location.url('/view/' + userdata.getUser());
		};
	}
}]);
app.controller('ViewController', ['$scope', 'userdata', '$location', '$routeParams',
		function($scope, userdata, $location, $routeParams) {
	var data = userdata.getCur();
	$scope.user = $routeParams.user;
	$scope.realname = data.realname;
	$scope.quote = data.quote;
	var user;
	$scope.showEdit = (user = userdata.getUser()) != undefined && user == $routeParams.user;
	$scope.editURL = "#/edit/" + user;
}]);

