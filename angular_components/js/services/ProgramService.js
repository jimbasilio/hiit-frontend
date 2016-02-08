hiit.service("ProgramService", ["$http", function($http) {
  getPrograms = function() {
	return $http.get("getAllForUser");
  };
}]);