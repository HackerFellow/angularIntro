var app = angular.module("cart", []);
app.controller("cartControl", function($scope){
	$scope.name;
	$scope.price;
	$scope.cart = [
		{name: 'apple',price: 42},
		{name: 'cart', price: 33},
		{name: 'foo', price: 42.22}
	];
	$scope.total = 0;
	//Just in case the cart got initialised
	$scope.cart.forEach(function(item){
		$scope.total += item.price;
	});
	$scope.createItem = function(){
		$scope.cart.push({name: $scope.name, price: $scope.price});
		$scope.total += $scope.price;
		//Clear fields
		$scope.name="";
		$scope.price = "";
	};
	$scope.remove = function(index){
		$scope.total -= $scope.cart[index].price;
		$scope.cart.splice(index,1);
	};
});
