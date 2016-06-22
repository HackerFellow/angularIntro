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


app.controller('MainController', function($scope, $routeParams) {
	$scope.name = "LandingController";
	$scope.params = $routeParams;
});

app.controller('LandingController', ['$scope', '$cookieStore', function($scope, $cookieStore) {
	var user;
	if((user = $cookieStore.get("user")) != undefined){//logged in
		$scope.message = "Win " + user;
	}else{
		$scope.notLoggedIn = true;
	}
}]);

app.controller('LoginController', ['$scope', '$cookieStore', '$location', function($scope, $cookieStore, $location) {
	$scope.name;
	$scope.login = function(){
		 $cookieStore.put('user',$scope.name);
		 $location.url('/edit/' + $scope.name);
	};
}]);
app.controller('EditController', ['$scope', '$cookieStore', '$location', '$routeParams',
		function($scope, $cookieStore, $location, $routeParams) {
	var user;
	if((user = $cookieStore.get("user")) == undefined){//Not logged in
		alert("Not logged in");
		$location.url('/');
	}else if($routeParams.user == undefined){
		$location.url('/edit/' + user);
	}else if(user != $routeParams.user){
		$location.url('/');
	}else{
		$scope.realname;
		$scope.quote;

		var data = $cookieStore.get($routeParams.user);
		if(data != undefined){
			$scope.realname = data.realname;
			$scope.quote = data.quote;
		}

		$scope.save = function(){
			 $cookieStore.put(user,{realname: $scope.realname,quote: $scope.quote});
			 $location.url('/view/' + user);
		};
	}
}]);
app.controller('ViewController', ['$scope', '$cookieStore', '$location', '$routeParams',
		function($scope, $cookieStore, $location, $routeParams) {
	var data = $cookieStore.get($routeParams.user);
	$scope.user = $routeParams.user;
	$scope.realname = data.realname;
	$scope.quote = data.quote;
	var user;
	$scope.showEdit = (user = $cookieStore.get("user")) != undefined && user == $routeParams.user;
	$scope.editURL = "#/edit/" + user;
}]);

