var app = angular.module("cart", []);
app.controller("cartControl", function($scope){
	$scope.name;
	$scope.price;
	$scope.cart = [];
	$scope.createItem = function(){
		$scope.cart.push({name: $scope.name, price: $scope.price});
	}
	$scope.getTotal = function(){
		var total = 0;
		$scope.cart.forEach(function(item){
			total += item.price;
		});
		return total;
	}
});
