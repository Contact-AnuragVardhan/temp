//app.js
var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope','$http', '$timeout','uiGridConstants', function ($scope, $http, $timeout,uiGridConstants) {
 
	 var today = new Date();
	 var nextWeek = new Date();
	 nextWeek.setDate(nextWeek.getDate() + 7);
	
	$scope.gridOptions = {
    enableSorting: true,
    enableFiltering: true
  };

  var colCount = 20;
  var rowCount = 500;

  $scope.gridOptions.columnDefs = [
          {field:'name',width:200 , enableColumnMenu:false},
          {field:'gender',width:200 , enableColumnMenu:false, filter: {
              term: '1',
              type: uiGridConstants.filter.SELECT,
              selectOptions: [ { value: '1', label: 'male' }, { value: '2', label: 'female' }, 
                               { value: '3', label: 'unknown'}, { value: '4', label: 'not stated' }, 
                               { value: '5', label: 'a really long value that extends things' } ]
            },
            cellFilter: 'mapGender'},
          {field:'company',width:200 , enableColumnMenu:false},
          {field:'email',width:200 , enableColumnMenu:false},
          {field:'phone',width:200 , enableColumnMenu:false},
          {field:'age',width:200 , enableColumnMenu:false},
          {field:'mixedDate',width:300, enableColumnMenu:false, cellFilter: 'date',  
        	  filters:[{ condition: checkStart}, {condition:checkEnd}],
        	  filterHeaderTemplate: '<div class="ui-grid-filter-container">from : <input style="display:inline; width:30%"  class="ui-grid-filter-input" date-picker type="text" ng-model="col.filters[0].term"/> to : <input style="display:inline; width:30%" class="ui-grid-filter-input" date-picker type="text" ng-model="col.filters[1].term"/></div>'
        		  },
          { field: 'mixedDate', width:200, displayName: "Long Date", cellFilter: 'date:"longDate"', filterCellFiltered:true}
    
    ];
  
  $scope.getData = function(){
	  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
	  .success(function(data) {
	    $scope.gridOptions.data = data;
	    
	    data.forEach( function addDates( row, index ){
	        row.mixedDate = new Date();
	        row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
	        row.gender = row.gender==='male' ? '1' : '2';
	     });
	    
	  });
  };
 
  $scope.getData();
  
  
  function checkStart(term, value, row, column) {
      term = term.replace(/\\/g,"")
      var now = moment(value);
      if(term) {
          if(moment(term).isAfter(now, 'day')) return false;
      } 
      return true;
  }

  function checkEnd(term, value, row, column) {
      term = term.replace(/\\/g,"")
      var now = moment(value);
      if(term) {
          if(moment(term).isBefore(now, 'day')) return false;
      } 
      return true;
  }

  $scope.$on("destroy", function(){
    $timeout.cancel();
  });
}]);

app.filter('mapGender', function() {
	  var genderHash = {
			    1: 'male',
			    2: 'female'
			  };

			  return function(input) {
			    if (!input){
			      return '';
			    } else {
			      return genderHash[input];
			    }
			  };
});

app.directive('datePicker', function(){
    return {
        restrict : "A",
        require: 'ngModel',
        link : function(scope, element, attrs, ngModel){
            $(function(){
                $(element).datepicker({
                     changeMonth: true,
                     changeYear: true,
                     closeText: 'Clear',
                     showButtonPanel: true,
                     onClose: function () {
                        var event = arguments.callee.caller.caller.arguments[0];
                        // If "Clear" gets clicked, then really clear it
                        if ($(event.delegateTarget).hasClass('ui-datepicker-close')) {
                            $(this).val('');
                            scope.$apply(function() {
                               ngModel.$setViewValue(null);
                            });
                        }
                    },
                    onSelect: function(date){
                        scope.$apply(function() {
                           ngModel.$setViewValue(date);
                        });
                    }
               });
            })
        }
    }
});
