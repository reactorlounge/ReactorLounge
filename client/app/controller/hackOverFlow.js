angular.module('reactorlounge.hackOverFlow', [])

.controller('HackOverFlowController', ['$scope', 'overFlow', function ($scope, overFlow) {

  $scope.data = {}

     var getQuestions = function(){
     overFlow.getQuestion()
      .then(function(msg){
       $scope.data.msgs = msg;
       console.log('Values from Data Base', msg)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

   $scope.postAnswer = function(qid,answer){
        console.log('hey u r in the post answer', qid, answer);
     overFlow.addAnswer(qid,answer) 
      .then(function(){

       getAnswers(); 
       getAnswerCount();
        console.log("hellooo Sucesss");
      })
      .catch(function (error) {
        console.error(error);
      });
    
  }

  var getAnswers = function(){
     overFlow.getAnswer()
      .then(function(ans){
       $scope.data.answers = ans;
       console.log('Values from Data Base in the ansers', ans);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  $scope.postQue = function(){
        console.log('message has been posted', $scope.question);
    overFlow.addQuestion($scope.question) 
      .then(function(){
        $scope.question=null;
        getQuestions(); 

      })
      .catch(function (error) {
        console.error(error);
      });
  }


$scope.addLike = function(status, id, likes){  

  console.log("Add Like Button Values", "status",status, "ID", id, "Likes", likes);
     if (status){
          likes++; 
         $scope.data.answers.forEach(function(answers){ 
          console.log("anserrs add like", answers);
     if (answers.id === id){
          answers.likes++;
          angular.element('#'+ answers.id).addClass('blue-text'); 
          }
          })     
         }

   else {
       likes--; 
      $scope.data.answers.forEach(function(answers){
    if (answers.id === id){
        answers.likes--;
       angular.element('#'+ answers.id).removeClass('blue-text');
        }
        })  
     }
     overFlow.addlike(id, likes)
         .then(function(){
          console.log("successs in add like");
            })
          .catch(function (error) {
         console.error(error);
         });
        }

 var getAnswerCount = function(){
     overFlow.getAnswerCount()
      .then(function(msg){
       $scope.data.anscount = msg;
       console.log('Values from   anscount', msg)
      })
      .catch(function (error) {
        console.error(error);
      });
  }


	overFlow.getCurrentUser()
    .then(function (user) {
      console.log('this is the user', user)
      $scope.userphoto = user.data[0].photolink;
      $scope.username = user.data[0].firstName + " " +user.data[0].lastName
    })



getAnswerCount();
getQuestions(); 

getAnswers();

}]);