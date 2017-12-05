angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location, New) {

// not a bad idea to create a dummy array
$scope.todos = [];

//GET ALL 
				New.getAllTodos().then(function(response){
					console.log(response.data);
					$scope.todos = response.data;
				});

//POST NEW 
			$scope.saveFunc = function(){
					if (!$scope.todo.description || $scope.todo.description == "") return;  // don't allow blank todos
					
					var todo = $scope.todo;  // manipulate a local variable, as opposed to an element in the DOM
					$scope.todo = {};  //  don't wait for callback to clear form (allows duplicates to be created)
					
					todo.status = 'loading';
					todo.action = 'creating todo...';  // render a "spinner" while todo is uploading to the server
					console.log(todo.name);
					
					// we can also immediately append our todo to the array (we do not need to wait for callback)
					$scope.todos.push(todo);
					console.log($scope.todos);
					New.postFunc(todo).then(function(response) {
						// because todo is already appended, we no longer need to re-request the entire todo list
						/*
						New.getAllTodos().then(function(res,err){
							console.log(res);
							$scope.todos = res.data	
						});
						*/
						
						delete todo.action;  // when the todo is uploaded, delete the "spinner"
						delete todo.status;  // we can also delete the status
						
						// no matter what, though, you'll need the mongo id of the object you just created (for deleting)
						
						// I'd look up Object.assign - essentially it copies all the properties of one object into another
						// In this case we want to overwrite certain properties, while keeping the angular hashkey intact, for example
						Object.assign(todo, response.data);
					}).catch(function(err) {
						// also a good idea to build in error handling... for example:
						todo.action = "Failed to create todo";
						todo.status = "error";
						
						// you could use this to render a re-save button, maybe
					});
				},

//EDIT POST 
			$scope.editFunc = function(obj){
				console.log('ouch edit!');
				
				if (obj.completed) return;  // again, we do not call the server if the todo is already complete
				
				// we can immediately append the todo to the completed list, while we wait for a server response
				obj.completed = true;
				obj.status = "loading";
				obj.action = "updating todo...";

				New.editTodos(obj._id).then(function(res){
					console.log(res);

					// once more, we do not need to call the server for a list of todos - we already have it!
					/*
					New.getAllTodos().then(function(response){
					$scope.todos = response.data;

					});
					*/
					
					// rather, we'll just update our object so that it renders appropriately
					delete obj.status;
					delete obj.action;
					Object.assign(obj, res.data);
				}).catch(function(err) {
					// we can handle the error to render meaningful information to the user
					obj.status = "error";
					obj.action = "failed to mark todo as completed";
				});
			};


//DELETE POST
			$scope.deleteFunc = function(obj){
				console.log('ouch delete!');
				console.log(obj);
				
				// once again, we change the status to inhibit duplicate requests to the server
				obj.status = "loading";
				obj.action = "deleting todo...";

				New.deleteTodos(obj._id).then(function(res){
					console.log(res);
				
					// and once more, we'll just manipulate the DOM directly
					/*
					New.getAllTodos().then(function(response){
					$scope.todos = response.data;

					});
					*/
					
					// that being said, js is a little obtuse about removing elements
					$scope.todos.splice($scope.todos.indexOf(obj), 1);
				}).catch(function(err) {
					// error handling
					obj.status = "error";
					obj.action = "failed to delete todo";
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

			

