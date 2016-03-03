global_url=' http://jsonplaceholder.typicode.com';

app.factory('POSTS',['$resource', function($resource) {
    return $resource('http://jsonplaceholder.typicode.com/posts');
}]);

app.service('MyPost',function(){
    
    var details;
    return{
        setData:function(data){
            details=data;
            //console.log(details);
        },
        getData:function(){
            return details;
        }
    }
});

