(function(){

    var app = angular.module("myApp", ['ngRoute', 'lbServices']);
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "Views/index.html"
            })
            .when("/home", {
                templateUrl : "Views/index.html"
            })
            .when("/reset", {
                templateUrl : "Views/reset.html"
            })
            .when("/guidelines", {
                templateUrl : "Views/guidelines.html"
            })
            .when("/tnc", {
                templateUrl : "Views/tnc.html"
            })
            .when("/privacy", {
                templateUrl : "Views/privacy.html"
            })
            .when("/team", {
                templateUrl : "Views/team-members.html"
            })
             .when("/brand", {
                templateUrl : "Views/brand.html"
            })
             .when("/campus", {
                templateUrl : "Views/campus.html"
            })
            .when("/login", {
                templateUrl: "Views/login.html"
            })
            .when("/join", {
                templateUrl: "Views/join.html"
            })
            .when("/signup/sponsor", {
                templateUrl: "Views/sponsorSingUp.html"
            })
            .when("/signup/organiser", {
                templateUrl: "Views/organiserSignUp.html"
            })
            .when("/contact", {
                templateUrl : "Views/contactUs.html"
            })
            .when("/faq", {
                redirectTo: "/faq-event-organiser"
            })
            .when("/faq-event-organiser", {
                templateUrl : "Views/faq-event-org.html"
            })
            .when("/faq-sponsor", {
                templateUrl : "Views/faq-sponsor.html"
            })
            .when("/howitworks", {
                redirectTo: "/howitworksevents"
            })
            .when("/howitworksevents", {
                templateUrl : "Views/hiwevents.html"
            })
             .when("/events", {
                templateUrl : "Views/index.html"
            })
            .when("/sponsor", {
                templateUrl : "../Views/sponsorSearch.html"
            })
            .when("/howitworkssponsors", {
                templateUrl : "Views/hiwsponsors.html"
            });
    //        .otherwise({
    //            templateUrl : "../Views/Index_view.html"
    //        });


    	app.use(function(req, res) {
   		 res.sendfile('../index2.html');
			});
    	
        $locationProvider.html5Mode(true);


    //     app.get('*', function(req, res) {
  		// res.sendfile('../index2.html')
	// })
    });


   

})();