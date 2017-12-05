angular.module('NewService', []).service('New', ['$http', function($http, $scope, New) {

// var URL = 'https://calm-ocean-58797.herokuapp.com';
var URL = 'https://open-source-projects-offshiftdevo.c9users.io:8081'; //'https://lystit-back.herokuapp.com';
var operator;
	return {
//GET ALL TODOS
		getAllTodos : function(data) {
			return $http.get(URL +'/get-allTodos')
			// .success(function(data){});
			// .error(function(data){});
		},
//POST NEW TODO
		postFunc : function(obj) {
			return $http.post(URL +'/post-newTodos', obj);
		},
//EDIT TODO
		editTodos : function(objId){
			console.log(objId);
			return $http.post(URL +'/post-editTodos/' + objId);
		},
//DELETE TODO
		deleteTodos : function(objId){
			console.log(objId);
			return $http.post(URL +'/post-deleteTodos/' + objId);
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