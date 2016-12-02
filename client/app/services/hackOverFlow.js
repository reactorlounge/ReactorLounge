angular.module('reactorlounge.overFlowService', [])

.factory('overFlow', ['$http', function ($http) {
  return {
  
    getQuestion: function () {
      return $http({
        method: 'GET',
        url: '/questions'
      }).then(function(resp) {
        return resp.data
      })
    } , 

 
     addQuestion: function (que) { 

      return $http({
        method: 'GET',
        url: '/sessions'
      }).then(function(resp){
        var userId = resp.data[0].userId
        return $http({
          method: 'POST',
          url: '/user',
          data: {userId: userId}
        })
      }).then(function(resp){
        console.log('this is resp data', resp.data[0])
        var firstName = resp.data[0].firstName
        var lastName = resp.data[0].lastName
        var avatar = resp.data[0].photolink
       return $http({
        method: 'POST',
        url:    '/questions', 
       data: {firstName: firstName, lastName: lastName, content: que,photolink: avatar}
      
      })
      })
    },
  

  addlike: function (id,like) {
     console.log("u r in the Addddddd Like ","id",id , "incremented like",like);
      return $http({
        method: 'POST',
        url:    '/Answerlikes', 
         data: {content:id,like}
      
      })
    },


    getAnswer: function () {
      return $http({
        method: 'GET',
        url: '/Answers'
      }).then(function(resp) {
        return resp.data
      })
    }, 

   
  getAnswerCount: function () {
      return $http({
        method: 'GET',
        url: '/AnswersCount'
      }).then(function(resp) {
        return resp.data
      })
    } , 


     addAnswer: function (qid,answer) { 
      console.log("hack over post service","qid",qid,"answer", answer)
      return $http({
        method: 'GET',
        url: '/sessions'
      }).then(function(resp){
        var usersId = resp.data[0].userId
        return $http({
          method: 'POST',
          url: '/user',
          data: {userId: usersId}
        })
      }).then(function(resp){
        console.log('this is resp data', resp.data[0])
        var first = resp.data[0].firstName
        var last = resp.data[0].lastName
        var avi = resp.data[0].photolink
          return $http({
        method: 'POST',
        url:    '/Answers', 
          data: {firstName: first, lastName: last, photolink: avi, Answer: answer, qid : qid}
        })
      })
    },

    getCurrentUser: function () {
    return $http({
    method: "GET",
    url: '/currentuser'
    })
   }

  }

     

}]);