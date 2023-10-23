/*angular.module('LearnOn') .directive('ng-file-upload-model', ngFileUploadModel);

ngFileUploadModel.$inject = ['$scope'];
function ngFileUploadModel($scope) {
	return {
		$scope: {
			ngFileUploadModel: "="
		},
		link: function ($scope, element, attributes) {
			element.bind("change", function (changeEvent) {
				var reader = new FileReader();
				reader.onload = function (loadEvent) {
						$scope.$apply(function () {
							$scope.ngFileUploadModel = {
								  name: changeEvent.target.files[0].name,
								  type: changeEvent.target.files[0].type,
								  data: changeEvent.target.files[0]
							};
						});
				}
				reader.readAsDataURL(changeEvent.target.files[0]);
			});
		}			  
	}
}*/



