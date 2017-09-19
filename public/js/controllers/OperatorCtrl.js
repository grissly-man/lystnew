angular.module('OperatorCtrl', []).controller('OperatorController', function($scope, $http, New) {

			New.getAllTodos().then(function(response){
				console.log(response.data);
				$scope.todos = response.data;
			});
				//New.getOperator(data);
				$scope.activeNew = New.getOperator();
				console.log($scope.activeNew);

});






