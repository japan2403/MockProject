

var app=angular.module("MockApp",['ngMaterial','ui.router','ngRoute','ngResource','MockDirectives']);

app.controller("MainController",function($scope,$state,$resource,POSTS){
    $state.go('main');
    $scope.posts;
    $scope.details={
        id:'',
        userId:'',
        title:'',
        body:''};
    
    POSTS.query({},function(response){
                $scope.posts=response;
	});
    
    $scope.addP=function(){
        $state.go('addpost');
    }
    $scope.addPost=function(){
        
        var uid=document.getElementById('userid').value;
        var p_title=document.getElementById('post_title').value;
        var p_body=document.getElementById('post_body').value;
        
        POSTS.save({userId:uid,title:p_title,body:p_body},function(response){
            
            $scope.post={
            id:response.id,
            title:p_title,
            body:p_body
            }
            $scope.posts.push($scope.post);
            console.log(response);
            $state.go('main');
        });
        
        
    }
});
app.config(['$stateProvider', function ($stateProvider,$routeProvider) {

//console.log('state');
//Routes your views to specific page state
     $stateProvider
      .state('main', {
          views: {
            'Main': {
              templateUrl:'views/main.html',
            }
          }
      })
      .state('detail', {
        views: {
          'Detail': {
            templateUrl: "views/detail.html",
          }
        }
      })
      .state('addpost', {
        views: {
          'AddPost': {
            templateUrl: "views/addpost.html",
          }
        }
      });
}]);

angular.module('MockDirectives',[]);
angular.module('MockDirectives').directive('listOfPosts',function($state,$rootScope,MyPost){
    return{
        restrict:'E',
        template:'<ul style="padding-left:20px; padding-right:0px;margin-top:0px; height:auto; width:900px; list-style-type:none;" >\
                        <!--This is main implementation. Remove other Li elements except first two-->\
                        <li class="listitem" ng-repeat="post in posts" post-click>\
                            <div>\
                                <div style="display:inline;">                           \
                                    <div class="post-id">{{post.id}}</div>\
                                    <div class="post-title">{{post.title}}</div>\
                                </div>\
                            </div>\
                        </li>\
                    </ul>',
        link:function(scope,element,attributes){
        }
    }
});
angular.module('MockDirectives').directive('postClick',function($state,$rootScope,POSTS,MyPost){
    return{
        restrict:'A',
        scope:false,
        link:function(scope,element,attributes){
            
            element.bind("click",function(){
                $state.go("detail");
                
                var post_id=$(element.context).find('.post-id').text();
                //console.log("hello"+post_id);
                //console.log(post_id);
                POSTS.query ({id:post_id}, function (data) {
                
                    console.log(data);
                    scope.details.id=data[0].id;
                    scope.details.userId=data[0].userId;
                    scope.details.title=data[0].title;
                    scope.details.body=data[0].body;
                    console.log(scope.details);
                
                }, function () {
                    console.log ("Failed to get data");
                })
                
               
                
            });
            
        }
    }
});
angular.module('MockDirectives').directive('backClick',function($state,$rootScope){
    return{
        restrict:'A',
        link:function(scope,element,attributes){
            
            element.bind("click",function(){
            
                $state.go("main");
            
            });    
        }
    }
});
angular.module('MockDirectives').directive('refreshClick',function($state,$rootScope,POSTS){
    return{
        restrict:'A',
        link:function(scope,element,attributes){
            
            element.bind("click",function(){
            
               POSTS.query ({}, function (data) {
               scope.posts=data;
               
                }, function () {
                    console.log ("Failed to get data");
                })
            
            });    
        }
    }
});