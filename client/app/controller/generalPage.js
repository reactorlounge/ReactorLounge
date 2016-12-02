angular.module('reactorlounge.generalPage', ['angularMoment', 'ngFileUpload'])

.controller('GeneralFeedController', ['$scope', 'generalFeed', 'moment', 'Upload', '$timeout','$window',function ($scope, generalFeed, moment, Upload, $timeout, $window ) {
   $scope.data = {}
  // $scope.data.msgs = [{userId: 'Christina', created_at: 'October 15', content: 'This is great'}, {name: 'Robert', date: 'October 15', message: 'Im a genius'}, {name: 'Kendrick', date: 'October 15', message: 'I frequent Youtuber'}, {name: 'Tulasi', date: 'October 15', message: 'Im awesome'}];
  $scope.exampleDate = moment().hour(8).minute(0).second(0).toDate();
//user s3 credentials
 $scope.creds = {
      bucket: 'reactorlounge',
      access_key: 'AKIAJBNNAS53SFCFAGNQ', 
      secret_key: 'hFvkg3BoUjHJh8pPoCjzva3hPIOSjCYRUQEasW+1'
    }

    var initialMsgs = function(){
    generalFeed.getMsg()
    .then(function(msg){
     $scope.data.msgs = msg;
    })
    .catch(function (error) {
      console.error(error);
    });
  }

//post messages on submit, clear out msg submit field & make a call to initialmsg to fetch msgs
  $scope.postMsg = function(){
    if($scope.picFile){
      if($scope.picFile.size > 10585760) {
      alert('Sorry, file size must be under 10MB');
      return false;
      } else {
      $scope.loading = true;
      $scope.upload($scope.picFile, $scope.picFile.name, function(){
         generalFeed.addMsg($scope.msg, $scope.imgUrl)
        .then(function(){
          $scope.loading = false;
          initialMsgs();
          $scope.msg=null;
          $scope.picFile=null;
        })
        .catch(function (error) {
          console.error(error);
        });
      })
    }
    } else {
    generalFeed.addMsg($scope.msg)
    .then(function(){
      initialMsgs();
      $scope.msg=null;
    })
    .catch(function (error) {
      console.error(error);
    });
    }
  }


//function uses aws sdk module to upload image to amazon s3
    $scope.upload = function(pic, name, callback) {
      AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
      AWS.config.region = 'us-east-1';
      var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
      if($scope.picFile) {
        var params = { Key: $scope.picFile.name, Body: $scope.picFile, ServerSideEncryption: 'AES256' };
        bucket.putObject(params, function(err, data) {
          if(err) {
            console.log(err.message);
            return false;
          }
          else if(data){
            $scope.loading = true;
            $scope.imgUrl = 'https://reactorlounge.s3.amazonaws.com/' + $scope.picFile.name
            callback($scope.imgUrl)
            console.log('Upload Done', $scope.imgUrl);
          }
        })
        .on('httpUploadProgress',function(progress) {
              console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
            });
      }
      else {
        console.log('No File Selected');
      }
    }

  $scope.addLike = function(status, id, likes){  

    if (status){
      likes++; 
      $scope.data.msgs.forEach(function(message){
        if (message.id === id){
        message.likes++;
        angular.element('#'+ message.id).addClass('blue-text'); 
        }
      })     
    } else {
      likes--; 
      $scope.data.msgs.forEach(function(message){
        if (message.id === id){
        message.likes--;
        angular.element('#'+ message.id).removeClass('blue-text');
        }
      })  
    }
    generalFeed.addlike(id, likes)
    .then(function(){
     console.log("successs in add like");
   })
    .catch(function (error) {
      console.error(error);
    });
  }

  $scope.addCmtLike = function(status, id, likes){
     console.log("in the comment add like", status, id, likes); 
    if (status){
      likes++; 
      $scope.data.cmts.forEach(function(comment){
        if (comment.id === id){
        comment.likes++;

        angular.element('#'+ comment.id).addClass('blue-text'); 
        }
      })     
      } else {
      likes--; 
      $scope.data.cmts.forEach(function(comment){
        if (comment.id === id){
        comment.likes--;
        angular.element('#'+ comment.id).removeClass('blue-text');
        }
      })  
    }
    generalFeed.cmtlike(id, likes)
    .then(function(){
     console.log("successs in add like");
   })
    .catch(function (error) {
      console.error(error);
    });
  }
  var initialCmts = function(){
    generalFeed.getCmt()
    .then(function(cmt){
      $scope.data.cmts = cmt;
    })
    .catch(function(err){
      console.log('this is a comment error', err);
    });
  }

  $scope.postCmt = function(id){
    for(var key in $scope.data.cmt){
      comment = $scope.data.cmt[key]
    }
    generalFeed.addCmt(comment, id)
    .then(function(){
      initialCmts()
      $scope.data.cmt=null;
    })
    .catch(function(err){
      console.log('this is a post comment error', err);
    })
  }

  $scope.signOutButton = function () {
  	generalFeed.signOut().then(function(){
  		$window.location.href = "/#/"
  	})
  }

  generalFeed.getCurrentUser().then(function (user) {
  	$scope.userphoto = user.data[0].photolink;
    console.log($scope.userphoto);

  	$scope.username = user.data[0].firstName + " " +user.data[0].lastName
  })

 initialMsgs();
 initialCmts();

}]);

  

