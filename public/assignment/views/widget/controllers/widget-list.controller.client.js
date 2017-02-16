(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController(WidgetService, $sce, $routeParams) {
        var viewModel = this;
        viewModel.userid = $routeParams['uid'];
        viewModel.websiteid = $routeParams['wid'];
        viewModel.pageid = $routeParams['pid'];

        //event handlers
        viewModel.getVideoURL =  getVideoURL;
        viewModel.getHTML = getHTML;
        viewModel.getWidgetURL = getWidgetURL;

        init();

        function init() {
            viewModel.widgets = WidgetService.findWidgetsByPageId(viewModel.pageid);
        }

        function getVideoURL(videoURL) {
            var urlPartsArray = videoURL.split("/");
            var urlLastPart = urlPartsArray[urlPartsArray.length-1];
            videoURL = "https://www.youtube.com/embed/" + urlLastPart;
            return $sce.trustAsResourceUrl(videoURL);
        }

        function getHTML(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

        function getWidgetURL(widgetType) {
            var url = "views/widget/templates/widget-" + widgetType + ".view.client.html";
            return url;
        }
    }
})();