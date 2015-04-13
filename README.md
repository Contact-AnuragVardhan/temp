'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

angular.module('BasicHttpAuthExample', [
    'Authentication',
    'Home',
    'ui.bootstrap',
    'dialogs',
    'ngRoute',
    'ngCookies'
])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'scripts/modules/authentication/views/login.html',
            hideMenus: true
        })

        .when('/home', {
        	 controller: 'LoginController',
             templateUrl: 'scripts/modules/authentication/views/login.html',
             hideMenus: true
        })

        .otherwise({ redirectTo: '/login' });
}])
// from http://blog.brunoscopelliti.com/xhr-interceptor-in-an-angularjs-web-app/
.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push(['$q', function($q) {
		var progressTimer = null;
		var totalFiles = 0;
		var filesDownloaded = 0;
		var isBarShown = false;
		
		function doProgress() 
		{
			var divProgressBar = document.getElementById("progressBar");
			if(filesDownloaded <= totalFiles)
			{
				var progressBarWidth=Math.round((filesDownloaded * 100)/totalFiles);
				if(progressBarWidth === 0)
				{
					progressBarWidth = 50;
				}
				divProgressBar.style.width = progressBarWidth + '%';
			}
			if(filesDownloaded >= totalFiles)
			{
				stopProgress();
			}
		}	

		function startProgress()
		{
			isBarShown = true;
			progressTimer=setInterval(function(){doProgress();},50);
		}
		
		function stopProgress()
		{
			clearInterval(progressTimer);
			totalFiles = 0;
			filesDownloaded = 0;
			isBarShown = false;
			var divProgressBar = document.getElementById("progressBar");
			
			divProgressBar.style.width = 0 + 'px';
		}
		
		  return {
			  request: function(config) 
			  {
			      if (totalFiles === 0) 
			      {
			    	  //Create div
			    	  
		          }
			      totalFiles++;
			      if(isBarShown)
			      {
			    	  doProgress();
			      }
			      else
			      {
			    	  startProgress();  
			      }
			      return config || $q.when(config);
			  },

			  requestError: function(rejection) 
			  {
			      // Called when another request fails.

			      // I am still searching a good use case for this.
			      // If you are aware of it, please write a comment

			      return $q.reject(rejection);
			  },

		    response: function(response) 
		    {
		    	filesDownloaded++;
	            //$rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url, result: response});
		    	 doProgress();
		      // response.status === 200
		      return response || $q.when(response);
		    },
		    responseError: function(rejection) 
		    {
		      // Executed only when the XHR response 
		      // has an error status code
		      filesDownloaded++;
	            //$rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url, result: response});
		      doProgress();

		      if (rejection.status == 406) 
		      {

		        // The interceptor "blocks" the error;
		        // and the success callback will be executed.

		        rejection.data = {stauts: 406, descr: 'unauthorized'};
		        return rejection.data;
		      }

		      // $q.reject creates a promise that is resolved as
		      // rejected with the specified reason.
		      // In this case the error callback will be executed.
		      
		      return $q.reject(rejection);
		    }
		  };
		}]);
}])
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);

-----------------------------------------------------------------------------------------------------------------
loadingTest.html

<!DOCTYPE html>
<html>
	<head>
		<title>Loader Test</title>
		
		<style type="text/css">
			.loaderBar 
			{
				position: fixed;
				z-index: 999999;
				top: 0;
				left: 0;
				width: 0%;
				height: 2px;
				background: #b91f1f;
				border-radius: 10%;
				-moz-transition: width 500ms ease-out,opacity 400ms linear;
				-ms-transition: width 500ms ease-out,opacity 400ms linear;
				-o-transition: width 500ms ease-out,opacity 400ms linear;
				-webkit-transition: width 500ms ease-out,opacity 400ms linear;
				transition: width 500ms ease-out,opacity 400ms linear;
			}
			
			.loaderBar 
			{
				position: absolute;
				content: '';
				top: 0;
				opacity: 1;
				width: 10%;
				right: 0px;
				height: 2px;
				box-shadow: #b91f1f 1px 0 6px 2px;
				border-radius: 50%;
			}
			
			.bar {
			  background: #b91f1f;
			  position: fixed;
			  z-index: 1031;
			  top: 0;
			  left: 0;
			  height: 2px;
			}
			
		</style>
		
		<script>
			var progressTimer = null;
			var totalFiles = 10;
			var filesDownloaded = 0;			

			function doProgress() 
			{
				filesDownloaded++;
				if(filesDownloaded <= totalFiles)
				{
					var divProgressBar = document.getElementById("progressBar");
					var progressBarWidth=Math.round((filesDownloaded * 100)/totalFiles);
					divProgressBar.style.width = progressBarWidth + '%';
				}
			}	

			function startProgress()
			{
				progressTimer=setInterval(function(){doProgress();},1000);
			}
			
		</script>
		
	</head>
	
	<body>
		<!--<div id="divBar" class="bar" role="bar" style="transition: all 200ms ease; -webkit-transition: all 200ms ease; transform: translate3d(-60%, 0px, 0px);"></div> -->
		<div id="progressBar" class="bar"></div>
		<button onclick="startProgress()">Click </button>
		
	</body>
</html>
