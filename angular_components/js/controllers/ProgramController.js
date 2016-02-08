hiit.controller("ProgramController", ["$scope", "$q", "ProgramService", function($scope, $q, ProgramService) {
  $scope.page = {
		  programs : {}
  };
  
  var fetchPrograms = function() {
//      ProgramService.getPrograms().then(function(result) {
//          $scope.page.programs = result.data;
//      });
  },
  initialize = function() {
	  
  };
  
  $q.all([fetchPrograms()]).then(initialize);
}]);