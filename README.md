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

----------------------------------------------------------------------------------------------------------------------------------------

loadDot.html


<!DOCTYPE html><html class=''>
<head><meta charset='UTF-8'><meta name="robots" content="noindex"><link rel="canonical" href="http://codepen.io/anon/pen/wBVgPe" />


<style class="cp-pen-styles">

.container {
  text-align: center;
  line-height:80vh;
}

.loadingContainer {
  display: inline-block;
}

.dots {
  display: inline-block;
  position: relative;
}
.dots:not(:last-child) {
  margin-right: 9px;
}
.dots:before, .dots:after {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
}

.dots:nth-child(n):before {
  -webkit-transform: translateY(-200%);
  transform: translateY(-200%);
  -webkit-animation: animBefore 1s linear infinite;
  animation: animBefore 1s linear infinite;
  -webkit-animation-delay: (-0.9 * n)s;
  animation-delay: (-0.9 * n)s;
  background-color: #F00;
}
.dots:nth-child(n):after {
  -webkit-transform: translateY(200%);
  transform: translateY(200%);
  -webkit-animation: animAfter 1s linear infinite;
  animation: animAfter 1s linear infinite;
  -webkit-animation-delay: (-0.9 * n)s;
  animation-delay: (-0.9 * n)s;
  background-color: #777;
}

/*.dots:nth-child(1):before {
  -webkit-transform: translateY(-200%);
  transform: translateY(-200%);
  -webkit-animation: animBefore 1s linear infinite;
  animation: animBefore 1s linear infinite;
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
  background-color: #F00;
}
.dots:nth-child(1):after {
  -webkit-transform: translateY(200%);
  transform: translateY(200%);
  -webkit-animation: animAfter 1s linear infinite;
  animation: animAfter 1s linear infinite;
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
  background-color: #777;
}
.dots:nth-child(2):before {
  -webkit-transform: translateY(-200%);
  transform: translateY(-200%);
  -webkit-animation: animBefore 1s linear infinite;
  animation: animBefore 1s linear infinite;
  -webkit-animation-delay: -1.8s;
  animation-delay: -1.8s;
  background-color: #F00;
}
.dots:nth-child(2):after {
  -webkit-transform: translateY(200%);
  transform: translateY(200%);
  -webkit-animation: animAfter 1s linear infinite;
  animation: animAfter 1s linear infinite;
  -webkit-animation-delay: -1.8s;
  animation-delay: -1.8s;
  background-color: #777;
}
.dots:nth-child(3):before {
  -webkit-transform: translateY(-200%);
  transform: translateY(-200%);
  -webkit-animation: animBefore 1s linear infinite;
  animation: animBefore 1s linear infinite;
  -webkit-animation-delay: -2.7s;
  animation-delay: -2.7s;
  background-color: #F00;
}
.dots:nth-child(3):after {
  -webkit-transform: translateY(200%);
  transform: translateY(200%);
  -webkit-animation: animAfter 1s linear infinite;
  animation: animAfter 1s linear infinite;
  -webkit-animation-delay: -2.7s;
  animation-delay: -2.7s;
  background-color: #777;
}
.dots:nth-child(4):before {
  -webkit-transform: translateY(-200%);
  transform: translateY(-200%);
  -webkit-animation: animBefore 1s linear infinite;
  animation: animBefore 1s linear infinite;
  -webkit-animation-delay: -3.6s;
  animation-delay: -3.6s;
  background-color: #F00;
}
.dots:nth-child(4):after {
  -webkit-transform: translateY(200%);
  transform: translateY(200%);
  -webkit-animation: animAfter 1s linear infinite;
  animation: animAfter 1s linear infinite;
  -webkit-animation-delay: -3.6s;
  animation-delay: -3.6s;
  background-color: #777;
}
.dots:nth-child(5):before {
  -webkit-transform: translateY(-200%);
  transform: translateY(-200%);
  -webkit-animation: animBefore 1s linear infinite;
  animation: animBefore 1s linear infinite;
  -webkit-animation-delay: -4.5s;
  animation-delay: -4.5s;
  background-color: #F00;
}
.dots:nth-child(5):after {
  -webkit-transform: translateY(200%);
  transform: translateY(200%);
  -webkit-animation: animAfter 1s linear infinite;
  animation: animAfter 1s linear infinite;
  -webkit-animation-delay: -4.5s;
  animation-delay: -4.5s;
  background-color: #777;
}
.dots:nth-child(6):before {
  -webkit-transform: translateY(-200%);
  transform: translateY(-200%);
  -webkit-animation: animBefore 1s linear infinite;
  animation: animBefore 1s linear infinite;
  -webkit-animation-delay: -5.4s;
  animation-delay: -5.4s;
  background-color: #F00;
}
.dots:nth-child(6):after {
  -webkit-transform: translateY(200%);
  transform: translateY(200%);
  -webkit-animation: animAfter 1s linear infinite;
  animation: animAfter 1s linear infinite;
  -webkit-animation-delay: -5.4s;
  animation-delay: -5.4s;
  background-color: #777;
}
.dots:nth-child(7):before {
  -webkit-transform: translateY(-200%);
  transform: translateY(-200%);
  -webkit-animation: animBefore 1s linear infinite;
  animation: animBefore 1s linear infinite;
  -webkit-animation-delay: -6.3s;
  animation-delay: -6.3s;
  background-color: #F00;
}
.dots:nth-child(7):after {
  -webkit-transform: translateY(200%);
  transform: translateY(200%);
  -webkit-animation: animAfter 1s linear infinite;
  animation: animAfter 1s linear infinite;
  -webkit-animation-delay: -6.3s;
  animation-delay: -6.3s;
  background-color: #777;
}
.dots:nth-child(8):before {
  -webkit-transform: translateY(-200%);
  transform: translateY(-200%);
  -webkit-animation: animBefore 1s linear infinite;
  animation: animBefore 1s linear infinite;
  -webkit-animation-delay: -7.2s;
  animation-delay: -7.2s;
  background-color: #F00;
}
.dots:nth-child(8):after {
  -webkit-transform: translateY(200%);
  transform: translateY(200%);
  -webkit-animation: animAfter 1s linear infinite;
  animation: animAfter 1s linear infinite;
  -webkit-animation-delay: -7.2s;
  animation-delay: -7.2s;
  background-color: #777;
}
.dots:nth-child(9):before {
  -webkit-transform: translateY(-200%);
  transform: translateY(-200%);
  -webkit-animation: animBefore 1s linear infinite;
  animation: animBefore 1s linear infinite;
  -webkit-animation-delay: -8.1s;
  animation-delay: -8.1s;
  background-color: #F00;
}
.dots:nth-child(9):after {
  -webkit-transform: translateY(200%);
  transform: translateY(200%);
  -webkit-animation: animAfter 1s linear infinite;
  animation: animAfter 1s linear infinite;
  -webkit-animation-delay: -8.1s;
  animation-delay: -8.1s;
  background-color: #777;
}
.dots:nth-child(10):before {
  -webkit-transform: translateY(-200%);
  transform: translateY(-200%);
  -webkit-animation: animBefore 1s linear infinite;
  animation: animBefore 1s linear infinite;
  -webkit-animation-delay: -9s;
  animation-delay: -9s;
  background-color: #F00;
}
.dots:nth-child(10):after {
  -webkit-transform: translateY(200%);
  transform: translateY(200%);
  -webkit-animation: animAfter 1s linear infinite;
  animation: animAfter 1s linear infinite;
  -webkit-animation-delay: -9s;
  animation-delay: -9s;
  background-color: #777;
}*/

@-webkit-keyframes animBefore {
  0% {
    -webkit-transform: scale(1) translateY(-200%);
    z-index: 1;
  }
  25% {
    -webkit-transform: scale(1.3) translateY(0);
    z-index: 1;
  }
  50% {
    -webkit-transform: scale(1) translateY(200%);
    z-index: -1;
  }
  75% {
    -webkit-transform: scale(0.7) translateY(0);
    z-index: -1;
  }
  100% {
    -webkit-transform: scale(1) translateY(-200%);
    z-index: -1;
  }
}
@keyframes animBefore {
  0% {
    transform: scale(1) translateY(-200%);
    z-index: 1;
  }
  25% {
    transform: scale(1.3) translateY(0);
    z-index: 1;
  }
  50% {
    transform: scale(1) translateY(200%);
    z-index: -1;
  }
  75% {
    transform: scale(0.7) translateY(0);
    z-index: -1;
  }
  100% {
    transform: scale(1) translateY(-200%);
    z-index: -1;
  }
}
@-webkit-keyframes animAfter {
  0% {
    -webkit-transform: scale(1) translateY(200%);
    z-index: -1;
  }
  25% {
    -webkit-transform: scale(0.7) translateY(0);
    z-index: -1;
  }
  50% {
    -webkit-transform: scale(1) translateY(-200%);
    z-index: 1;
  }
  75% {
    -webkit-transform: scale(1.3) translateY(0);
    z-index: 1;
  }
  100% {
    -webkit-transform: scale(1) translateY(200%);
    z-index: 1;
  }
}
@keyframes animAfter {
  0% {
    transform: scale(1) translateY(200%);
    z-index: -1;
  }
  25% {
    transform: scale(0.7) translateY(0);
    z-index: -1;
  }
  50% {
    transform: scale(1) translateY(-200%);
    z-index: 1;
  }
  75% {
    transform: scale(1.3) translateY(0);
    z-index: 1;
  }
  100% {
    transform: scale(1) translateY(200%);
    z-index: 1;
  }
}
</style></head><body>
<div class="container">
	<div class="loadingContainer">
	  <span class="dots"></span>
	  <span class="dots"></span>
	  <span class="dots"></span>
	  <span class="dots"></span>
	  <span class="dots"></span>
	  <span class="dots"></span>
	  <span class="dots"></span>
	  <span class="dots"></span>
	  <span class="dots"></span>
	  <span class="dots"></span>
	</div>
</div>



<script>
	"use strict";
/*var CSSReload = {
    head: null,
    init: function() {
        this._storeHead(), this._listenToPostMessages()
    },
    _storeHead: function() {
        this.head = document.head || document.getElementsByTagName("head")[0]
    },
    _listenToPostMessages: function() {
        var e = this;
        window[this._eventMethod()](this._messageEvent(), function(t) {
            try {
                var s = JSON.parse(t.data);
                e._refreshCSS(s)
            } catch (n) {}
        }, !1)
    },
    _messageEvent: function() {
        return "attachEvent" === this._eventMethod() ? "onmessage" : "message"
    },
    _eventMethod: function() {
        return window.addEventListener ? "addEventListener" : "attachEvent"
    },
    _refreshCSS: function(e) {
        var t = this._findPrevCPStyle(),
            s = document.createElement("style");
        s.type = "text/css", s.className = "cp-pen-styles", s.styleSheet ? s.styleSheet.cssText = e.css : s.appendChild(document.createTextNode(e.css)), this.head.appendChild(s), t && t.parentNode.removeChild(t), "prefixfree" === e.css_prefix && StyleFix.process()
    },
    _findPrevCPStyle: function() {
        for (var e = document.getElementsByTagName("style"), t = e.length - 1; t >= 0; t--)
            if ("cp-pen-styles" === e[t].className) return e[t];
        return !1
    }
};
CSSReload.init();*/
</script>
</body></html>

---------------------------------------------------------------------------------------

<!DOCTYPE html><html class=''>
<head><meta charset='UTF-8'><meta name="robots" content="noindex"><link rel="canonical" href="http://codepen.io/anon/pen/wBVgPe" />


<style class="cp-pen-styles">

.container {
  text-align: center;
  line-height:150%;
}

.loadingContainer {
  display: inline-block;
}




@-webkit-keyframes animBefore {
  0% {
    -webkit-transform: scale(1) translateY(-200%);
    z-index: 1;
  }
  25% {
    -webkit-transform: scale(1.3) translateY(0);
    z-index: 1;
  }
  50% {
    -webkit-transform: scale(1) translateY(200%);
    z-index: -1;
  }
  75% {
    -webkit-transform: scale(0.7) translateY(0);
    z-index: -1;
  }
  100% {
    -webkit-transform: scale(1) translateY(-200%);
    z-index: -1;
  }
}
@keyframes animBefore {
  0% {
    transform: scale(1) translateY(-200%);
    z-index: 1;
  }
  25% {
    transform: scale(1.3) translateY(0);
    z-index: 1;
  }
  50% {
    transform: scale(1) translateY(200%);
    z-index: -1;
  }
  75% {
    transform: scale(0.7) translateY(0);
    z-index: -1;
  }
  100% {
    transform: scale(1) translateY(-200%);
    z-index: -1;
  }
}
@-webkit-keyframes animAfter {
  0% {
    -webkit-transform: scale(1) translateY(200%);
    z-index: -1;
  }
  25% {
    -webkit-transform: scale(0.7) translateY(0);
    z-index: -1;
  }
  50% {
    -webkit-transform: scale(1) translateY(-200%);
    z-index: 1;
  }
  75% {
    -webkit-transform: scale(1.3) translateY(0);
    z-index: 1;
  }
  100% {
    -webkit-transform: scale(1) translateY(200%);
    z-index: 1;
  }
}
@keyframes animAfter {
  0% {
    transform: scale(1) translateY(200%);
    z-index: -1;
  }
  25% {
    transform: scale(0.7) translateY(0);
    z-index: -1;
  }
  50% {
    transform: scale(1) translateY(-200%);
    z-index: 1;
  }
  75% {
    transform: scale(1.3) translateY(0);
    z-index: 1;
  }
  100% {
    transform: scale(1) translateY(200%);
    z-index: 1;
  }
}
</style></head><body>
<div class="container">
                <div id="mynew" class="loadingContainer">
                
                </div>
</div>



<script>



head = document.head || document.getElementsByTagName('head')[0],
   

                "use strict";

var n=100 ;
var divDots = document.getElementById("mynew") ; 
var preAni = 0 ; 
for(var i=0;i<n;i++)
{
  preAni = preAni + (-0.9) ; 
  var css = '\n.dots'+i+' {display: inline-block; position: relative;}.dots'+i+':not(:last-child) {  margin-right: 9px;}.dots'+i+':before, .dots'+i+':after {  content: "";  display: inline-block;  width: 6px;  height: 6px;  border-radius: 50%;  position: absolute;}.dots'+i+':before {  -webkit-transform: translateY(-200%);  transform: translateY(-200%);  -webkit-animation: animBefore 1s linear infinite;  animation: animBefore 1s linear infinite;  -webkit-animation-delay: '+preAni+'s;  animation-delay: '+preAni+'s;  background-color: #F00;}.dots'+i+':after {  -webkit-transform: translateY(200%);  transform: translateY(200%);  -webkit-animation: animAfter 1s linear infinite;  animation: animAfter 1s linear infinite;  -webkit-animation-delay: '+preAni+'s;  animation-delay: '+preAni+'s;  background-color: #777;}'


style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);

  var spanDot = document.createElement("span") ; 
  spanDot.className = "dots"+i ;

  var style = document.createElement("style");
   

for(var k in spanDot.style)
{
    if(i==0)
                {
    alert(k) ; 
                }
}
  divDots.appendChild(spanDot) ;

}



</script>
</body></html>

-----------------------------------------------------------------------

/*
 * angular-loading-bar
 *
 * intercepts XHR requests and creates a loading bar.
 * Based on the excellent nprogress work by rstacruz (more info in readme)
 *
 * (c) 2013 Wes Cruver
 * License: MIT
 */


(function() {

'use strict';

// Alias the loading bar for various backwards compatibilities since the project has matured:
angular.module('angular-loading-bar', ['cfp.loadingBarInterceptor']);
angular.module('chieffancypants.loadingBar', ['cfp.loadingBarInterceptor']);


/**
 * loadingBarInterceptor service
 *
 * Registers itself as an Angular interceptor and listens for XHR requests.
 */
angular.module('cfp.loadingBarInterceptor', ['cfp.loadingBar'])
  .config(['$httpProvider', function ($httpProvider) {

    var interceptor = ['$q', '$cacheFactory', '$timeout', '$rootScope', '$log', 'cfpLoadingBar', function ($q, $cacheFactory, $timeout, $rootScope, $log, cfpLoadingBar) {

      /**
       * The total number of requests made
       */
      var reqsTotal = 0;

      /**
       * The number of requests completed (either successfully or not)
       */
      var reqsCompleted = 0;

      /**
       * The amount of time spent fetching before showing the loading bar
       */
      var latencyThreshold = cfpLoadingBar.latencyThreshold;

      /**
       * $timeout handle for latencyThreshold
       */
      var startTimeout;


      /**
       * calls cfpLoadingBar.complete() which removes the
       * loading bar from the DOM.
       */
      function setComplete() {
        $timeout.cancel(startTimeout);
        cfpLoadingBar.complete();
        reqsCompleted = 0;
        reqsTotal = 0;
      }

      /**
       * Determine if the response has already been cached
       * @param  {Object}  config the config option from the request
       * @return {Boolean} retrns true if cached, otherwise false
       */
      function isCached(config) {
        var cache;
        var defaultCache = $cacheFactory.get('$http');
        var defaults = $httpProvider.defaults;

        // Choose the proper cache source. Borrowed from angular: $http service
        if ((config.cache || defaults.cache) && config.cache !== false &&
          (config.method === 'GET' || config.method === 'JSONP')) {
            cache = angular.isObject(config.cache) ? config.cache
              : angular.isObject(defaults.cache) ? defaults.cache
              : defaultCache;
        }

        var cached = cache !== undefined ?
          cache.get(config.url) !== undefined : false;

        if (config.cached !== undefined && cached !== config.cached) {
          return config.cached;
        }
        config.cached = cached;
        return cached;
      }


      return {
        'request': function(config) {
          // Check to make sure this request hasn't already been cached and that
          // the requester didn't explicitly ask us to ignore this request:
          if (!config.ignoreLoadingBar && !isCached(config)) {
            $rootScope.$broadcast('cfpLoadingBar:loading', {url: config.url});
            if (reqsTotal === 0) {
              startTimeout = $timeout(function() {
                cfpLoadingBar.start();
              }, latencyThreshold);
            }
            reqsTotal++;
            cfpLoadingBar.set(reqsCompleted / reqsTotal);
          }
          return config;
        },

        'response': function(response) {
          if (!response || !response.config) {
            $log.error('Broken interceptor detected: Config object not supplied in response:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
            return response;
          }

          if (!response.config.ignoreLoadingBar && !isCached(response.config)) {
            reqsCompleted++;
            $rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url, result: response});
            if (reqsCompleted >= reqsTotal) {
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return response;
        },

        'responseError': function(rejection) {
          if (!rejection || !rejection.config) {
            $log.error('Broken interceptor detected: Config object not supplied in rejection:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
            return $q.reject(rejection);
          }

          if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
            reqsCompleted++;
            $rootScope.$broadcast('cfpLoadingBar:loaded', {url: rejection.config.url, result: rejection});
            if (reqsCompleted >= reqsTotal) {
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return $q.reject(rejection);
        }
      };
    }];

    $httpProvider.interceptors.push(interceptor);
  }]);


/**
 * Loading Bar
 *
 * This service handles adding and removing the actual element in the DOM.
 * Generally, best practices for DOM manipulation is to take place in a
 * directive, but because the element itself is injected in the DOM only upon
 * XHR requests, and it's likely needed on every view, the best option is to
 * use a service.
 */
angular.module('cfp.loadingBar', [])
  .provider('cfpLoadingBar', function() {

    this.includeSpinner = true;
    this.includeBar = true;
    this.latencyThreshold = 100;
    this.startSize = 0.02;
    this.parentSelector = 'body';
    this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>';
    this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';

    this.$get = ['$injector', '$document', '$timeout', '$rootScope', function ($injector, $document, $timeout, $rootScope) {
      var $animate;
      var $parentSelector = this.parentSelector,
        loadingBarContainer = angular.element(this.loadingBarTemplate),
        loadingBar = loadingBarContainer.find('div').eq(0),
        spinner = angular.element(this.spinnerTemplate);

      var incTimeout,
        completeTimeout,
        started = false,
        status = 0;

      var includeSpinner = this.includeSpinner;
      var includeBar = this.includeBar;
      var startSize = this.startSize;

      /**
       * Inserts the loading bar element into the dom, and sets it to 2%
       */
      function _start() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        var $parent = $document.find($parentSelector).eq(0);
        $timeout.cancel(completeTimeout);

        // do not continually broadcast the started event:
        if (started) {
          return;
        }

        $rootScope.$broadcast('cfpLoadingBar:started');
        started = true;

        if (includeBar) {
          $animate.enter(loadingBarContainer, $parent, angular.element($parent[0].lastChild));
        }

        if (includeSpinner) {
          $animate.enter(spinner, $parent, angular.element($parent[0].lastChild));
        }

        _set(startSize);
      }

      /**
       * Set the loading bar's width to a certain percent.
       *
       * @param n any value between 0 and 1
       */
      function _set(n) {
        if (!started) {
          return;
        }
        var pct = (n * 100) + '%';
        loadingBar.css('width', pct);
        status = n;

        // increment loadingbar to give the illusion that there is always
        // progress but make sure to cancel the previous timeouts so we don't
        // have multiple incs running at the same time.
        $timeout.cancel(incTimeout);
        incTimeout = $timeout(function() {
          _inc();
        }, 250);
      }

      /**
       * Increments the loading bar by a random amount
       * but slows down as it progresses
       */
      function _inc() {
        if (_status() >= 1) {
          return;
        }

        var rnd = 0;

        // TODO: do this mathmatically instead of through conditions

        var stat = _status();
        if (stat >= 0 && stat < 0.25) {
          // Start out between 3 - 6% increments
          rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
        } else if (stat >= 0.25 && stat < 0.65) {
          // increment between 0 - 3%
          rnd = (Math.random() * 3) / 100;
        } else if (stat >= 0.65 && stat < 0.9) {
          // increment between 0 - 2%
          rnd = (Math.random() * 2) / 100;
        } else if (stat >= 0.9 && stat < 0.99) {
          // finally, increment it .5 %
          rnd = 0.005;
        } else {
          // after 99%, don't increment:
          rnd = 0;
        }

        var pct = _status() + rnd;
        _set(pct);
      }

      function _status() {
        return status;
      }

      function _completeAnimation() {
        status = 0;
        started = false;
      }

      function _complete() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        $rootScope.$broadcast('cfpLoadingBar:completed');
        _set(1);

        $timeout.cancel(completeTimeout);

        // Attempt to aggregate any start/complete calls within 500ms:
        completeTimeout = $timeout(function() {
          var promise = $animate.leave(loadingBarContainer, _completeAnimation);
          if (promise && promise.then) {
            promise.then(_completeAnimation);
          }
          $animate.leave(spinner);
        }, 500);
      }

      return {
        start            : _start,
        set              : _set,
        status           : _status,
        inc              : _inc,
        complete         : _complete,
        includeSpinner   : this.includeSpinner,
        latencyThreshold : this.latencyThreshold,
        parentSelector   : this.parentSelector,
        startSize        : this.startSize
      };


    }];     //
  });       // wtf javascript. srsly
})();       //

--------------------------------------------------------------------------------------

PasswordVerifier.html


<!DOCTYPE html>
<html>

<head>

  <meta charset="UTF-8">

  <meta name="google" value="notranslate">

  <!--
Copyright (c) 2015 by Bruno Scopelliti (http://codepen.io/brunoscopelliti/pen/CctvH)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
-->

  <title>CodePen - pwCheck</title>

  <style>* {
    margin:0;
    padding:0;
}
body {
    padding:10px;
}
label {
    display:block;
    font-size:14px;
    margin:10px 0 2px;
}
input {
    padding:1px 3px;
}
.msg-block {
    margin-top:5px;
}
.msg-error {
    color:#F00;
    font-size:14px;
}</style>

</head>

<body onload="_l='t';">

  <!doctype html>
<html lang="en" ng-app="myApp">

    <head>
        <meta charset="utf-8" />
        <title>My AngularJS App</title>
    </head>

    <body ng-controller="stageController">
        <form name="myForm">
            <label for="pw1">Set a password:</label>
            <input type="password" id="pw1" name="pw1" ng-model="pw1" ng-required="" />
            <label for="pw2">Confirm the password:</label>
            <input type="password" id="pw2" name="pw2" ng-model="pw2" ng-required="" pw-check="pw1" />
            <div class="msg-block" ng-show="myForm.$error"> <span class="msg-error" ng-show="myForm.pw2.$error.pwmatch">Passwords don't match.</span> 
            </div>
        </form>
    </body>

</html>

  <script src='//assets.codepen.io/assets/libs/fullpage/jquery-c152c51c4dda93382a3ae51e8a5ea45d.js'></script>
  <script src='http://ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js'></script>

<!--   <script src="//assets.codepen.io/assets/common/stopExecutionOnTimeout-6c99970ade81e43be51fa877be0f7600.js"></script> -->

  <script>
'use strict';
angular.module('myApp', ['myApp.directives']);
function stageController($scope) {
    $scope.pw1 = 'password';
}
angular.module('myApp.directives', []).directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                    });
                });
            }
        };
    }]);
  </script>

</body>

</html>


