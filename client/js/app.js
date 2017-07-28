(function(){

    var app = angular.module("myApp", ["ngRoute","ui.router",'chart.js']);
    app.config(function($routeProvider, $locationProvider) {
        // $stateProvider
        //     .state('add-review', {
        //         url: '/gym_users:userId?',
        //         templateUrl: 'Views/index.html',
        //         // controller: 'AddReviewController',
        //         authenticate: true
        //     });
        $routeProvider
            .when("/", {
                templateUrl : "Views/login.html",
                // showHeader : false,
            })
            .when("/admin:userId?", {
                templateUrl : "Views/admin_landing_page.html",
                // showHeader : true,
            })
            .when("/add_gym_user:userId?", {
                templateUrl : "Views/register_user.html",
                
            })
            .when("/del_gym_user:userId?", {
                templateUrl : "Views/del_user.html",
                
            })
            .when("/del_gym_user/user_found/id=:id/:access_token", {
                templateUrl : "Views/del_user_redirect.html",
                
                controller: 'delete_user_controller'
            })
            .when("/edit_gym_user:userId?", {
                templateUrl : "Views/edit_user.html",
                
            })
            .when("/edit_gym_user/user_found/id=:id/:access_token", {
                templateUrl : "Views/edit_user_redirect.html",
                
                controller: 'edit_user_controller'
            })
            .when("/view_gym_users:userId?", {
                templateUrl : "Views/view_users.html",
                
                controller: 'view_users_controller'
            })
            .when("/search/id=:search_key/:access_token?", {
                templateUrl : "Views/view_user_search.html",
                
                controller: 'search_user_controller'
            })
            .when("/change_password", {
                templateUrl : "Views/change_password.html"
            })
            .when("/charts", {
                templateUrl : "Views/analytics_chart_user_reg_num.html",
                
                // controller: 'edit_user_controller'
            })
            .when("/analytics_gym_user/user_found/gymUserId=:id/:access_token", {
                templateUrl : "Views/analytics_chart_user.html",
                
                controller: 'analytics_user_controller'
            });


        $locationProvider.html5Mode(true);


        
    });




     app.controller('delete_user_controller', ['$routeParams', '$scope', '$http', function($routeParams, $scope, $http ) {
        
        var id = $routeParams.id
        var access_token = $routeParams.access_token
        $http.get('/api/gym_users/findOne?filter[where][id]=' + id + '&' + access_token)
        .then(function(response) {
        $scope.users_json_data = response.data;
        // $scope.reg_number = $routeParams.registration_number;
        // alert("CONTROLLER WORKS")
        });
    }]);


     app.controller('edit_user_controller', ['$routeParams', '$scope', '$http', function($routeParams, $scope, $http ) {
        
        var id = $routeParams.id
        var access_token = $routeParams.access_token
        $http.get('/api/gym_users/findOne?filter[where][id]=' + id + '&' + access_token)
        .then(function(response) {
        $scope.users_json_data = response.data;
        // $scope.reg_number = $routeParams.registration_number;
        // alert("CONTROLLER WORKS")
        });
    }]);


     app.controller('view_users_controller', ['$routeParams', '$scope', '$http', function($routeParams, $scope, $http ) {
        
    
        var access_token = $routeParams.access_token
        $http.get('/api/gym_users?access_token=' + access_token)
        .then(function(response) {
        $scope.users_json_data = response.data;

        // $scope.data=[10,90];    //REMEMBER
        
        // $scope.reg_number = $routeParams.registration_number;
        // alert("CONTROLLER WORKS")
        });

        $http.get('/api/gym_users/count?access_token=' + access_token)
        .then(function(response) {
        $scope.count = response.data;

        // $scope.reg_number = $routeParams.registration_number;
        // alert("CONTROLLER WORKS")
        });  




    }]);


      app.controller('analytics_user_controller', ['$routeParams', '$scope', '$http', function($routeParams, $scope, $http ) {
        
        var id = $routeParams.id
        var access_token = $routeParams.access_token
        alert(id)
        alert(access_token)
        $http.get('/api/health_analytics?filter[where][gymUserId]=' + id + '&' + access_token)
        .then(function(response) {
        // $scope.users_json_data = response.data;
        $scope.users_json_data = [10,20,30]
        // $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
        // $scope.data = [300, 500, 100, 40, 120];
        // $scope.reg_number = $routeParams.registration_number;
        });
    }]);



      app.controller('search_user_controller', ['$routeParams', '$scope', '$http', function($routeParams, $scope, $http ) {
        
        var key = $routeParams.search_key
        var access_token = $routeParams.access_token
        alert(access_token)
        $http.get('/api/gym_users?filter[where][or][0][name][regexp]=/^' + key + '/i&filter[where][or][1][registration_number]=' + key +'&' + access_token)
        .then(function(response) {
        // $scope.users_json_data = response.data;
        $scope.users_json_data = response.data
        // $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
        // $scope.data = [300, 500, 100, 40, 120];
        // $scope.reg_number = $routeParams.registration_number;
        });
    }]);
     


// run(['$rootScope', function($rootScope) {
//     $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
//         $rootScope.showHeader = next.$$route.showHeader;
//     });
// }]);

})();