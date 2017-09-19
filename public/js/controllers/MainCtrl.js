angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location, New) {
			
//GET ALL 
			New.getAllTodos().then(function(response){
				console.log(response.data);
				$scope.todos = response.data;
			});

//POST NEW 
			$scope.saveFunc = function(){		
					$scope.todo.status = 'in-progress';
					console.log($scope.todo.name);
					New.postFunc($scope.todo).then(function(response){
						console.log($scope.todo);
						$scope.todo = {};

						New.getAllTodos().then(function(res,err){
							console.log(res);
							$scope.todos = res.data	
						});

					});
				},

//EDIT POST 
			$scope.editFunc = function(obj){
				console.log('ouch edit!');
				console.log(obj);
				var tempObj = {_id: obj};

				New.editTodos(tempObj).then(function(res,err){
					if(err){console.log("edit error");}
					else{console.log(res);}

					New.getAllTodos().then(function(response){
					$scope.todos = response.data;

					});
				});
			}


//DELETE POST
			$scope.deleteFunc = function(obj){
				console.log('ouch delete!');
				console.log(obj);
				var delObj = {_id: obj};

				New.deleteTodos(delObj).then(function(res,err){
					if(err){console.log("delete error");}
					else{console.log(res);}
				
					New.getAllTodos().then(function(response){
					$scope.todos = response.data;

					});	
				});
			}

//FILTER POST
			$scope.opFunc = function(data){
				console.log(data);
				New.addOperator(data);
				$location.path('/operator');
			}
			

//SHOW-ME 	
			// $scope.showMe = function(){
			//  console.log('show me works');
			// 	$scope.showMe = 'variable';
			// }

});

// =================================OLD STUFF============================================== 
// 			var URL = 'https://calm-ocean-58797.herokuapp.com';
// 			// var URL = 'http://localhost3000';
// //GET ALL
// 			$http.get(URL +'/get-allTodos').then(function (response){
// 				console.log(response.data);
// 				$scope.todos = response.data;

// 			});

// 		// });
// //POST NEW TODO
// 			$scope.saveFunc = function(){
// 				console.log($scope.todo);
// 				$scope.todo.status='in-progress';
// 				$scope.todo.test='hello';
// 				$http.post(URL +'/post-newTodos', $scope.todo).then(function(response){
// 					console.log(response);
// 					$scope.todo = {};
// //GET REPOPULATE TODOS
// 						$http.get(URL + '/get-allTodos').then(function(res){
// 							$scope.todos = res.data;
// 						});
// 					});
// 				};
// 		// });	
// //EDIT COMPLETES 
// 			$scope.edit = function(i){
// 				console.log(i);
// 				$scope.editObject = $scope.todos[i];
// 				// $scope.todo.status = 'complete'; 
// 				// $http.get(URL+'/get-newTodos', $scope.todo).then(function(res){
// 				// 	$scope.todos = res.data;
// 				// });
// 			}
// 		});
// ====================================================================================

			

