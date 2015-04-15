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

