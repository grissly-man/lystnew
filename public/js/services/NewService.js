angular.module('NewService', []).service('New', ['$http', function($http, $scope, New) {

// var URL = 'https://calm-ocean-58797.herokuapp.com';
var URL = 'https://lystit-api.herokuapp.com';
var operator;
	return {
//GET ALL TODOS
		getAllTodos : function(data) {
			return $http.get(URL +'/get-allTodos', data)
			// .success(function(data){});
			// .error(function(data){});
		},
//POST NEW TODO
		postFunc : function(obj){
			return $http.post(URL +'/post-newTodos', obj)
			// .success(function(data){});
			// .error(function(data){});
		},
//EDIT TODO
		editTodos : function(tempObj){
			console.log(tempObj);
			return $http.post(URL +'/post-editTodos', tempObj)
		},
//DELETE TODO
		deleteTodos : function(delObj){
			console.log(delObj);
			return $http.post(URL +'/post-deleteTodos', delObj)
		},
//PASSING DATA BETWEEN CONTROLLERS
		addOperator : function(data){
			// console.log(data);
			operator = data;
		},

		getOperator : function(data){
			console.log(data);
			return operator;
		},


		   } 

}]);