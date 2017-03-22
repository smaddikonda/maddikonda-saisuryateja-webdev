(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, WidgetService, FlickrService) {
        var viewModel = this;
        viewModel.userId = $routeParams['uid'];
        viewModel.websiteId = $routeParams['wid'];
        viewModel.pageId = $routeParams['pid'];
        viewModel.widgetId = $routeParams['wgid'];

        viewModel.searchPhotos = searchPhotos;
        viewModel.selectPhoto = selectPhoto;

        init();

        function init() {
            console.log("Got into Flickr controller");
        }

        function searchPhotos(searchString) {
            FlickrService
                .searchPhotos(searchString)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length-1);
                    data = JSON.parse(data);
                    viewModel.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var photoURL = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var newPhoto = {
                websiteId: viewModel.websiteId,
                pageId: viewModel.pageId,
                url: photoURL,
                widgetType: 'IMAGE'
            };

            WidgetService
                .updateWidget(viewModel.widgetId, newPhoto)
                .success(function(image){
                    $location.url("/user/"+ viewModel.userId +"/website/"+ viewModel.websiteId + "/page/"+ viewModel.pageId + "/widget/" + viewModel.widgetId);
                });
        }
    }
})();