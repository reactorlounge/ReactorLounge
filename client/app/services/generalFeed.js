angular.module('reactorlounge.services', [])

.factory('generalFeed', ['$http', function ($http) {
  return {
  //get request to fetch all messages from /messages
    getMsg: function () {
      return $http({
        method: 'GET',
        url: '/messages'
      }).then(function(resp) {
        return resp.data;
      })  
    },


// To  Update Likes Post Request 

  addlike: function (id,like) {
     //console.log("u r in the Addddddd Like ","id",id , "incremented like",like);
      return $http({
        method: 'POST',
        url:    '/likes', 
         data: {content:id,like}
      
      })
    },

  cmtlike: function (id,like) {
   //console.log("u r in the cmt Like ","id",id , "incremented like",like);
    return $http({
      method: 'POST',
      url:    '/cmtlikes', 
       data: {commentId: id, like: like}
    })
  },
 //post request to add a message to /messages
    addMsg: function (Msg, Img) {
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
          url: '/messages',
          data: {firstName: firstName, lastName: lastName, photolink: avatar, content: Msg, msgImageUrl: Img }
        })
      })
    },
  //get request to get comments from /comments
    getCmt: function () {
      return $http({
        method: 'GET',
        url: '/comments'
      }).then(function(resp) {
        return resp.data
      })
    },
  //post request to add a comment to /comments
    addCmt: function (Cmt, id) {
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
        for(var key in Cmt){
          comment = Cmt;
        }
        console.log('this is resp data', resp.data[0])
        var first = resp.data[0].firstName
        var last = resp.data[0].lastName
        var avi = resp.data[0].photolink
        return $http({
          method: 'POST',
          url: '/comments',
          data: {firstName: first, lastName: last, photolink: avi, content: comment, msgId: id}
        })
      })
    },

   signOut: function(){
   	return $http({
   		method: "POST",
   		url: '/signout'
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


