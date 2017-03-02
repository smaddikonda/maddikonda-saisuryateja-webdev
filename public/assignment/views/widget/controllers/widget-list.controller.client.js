(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController(WidgetService,$sce,$routeParams) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userid = userId;
        var websiteId = $routeParams['wid'];
        viewModel.websiteid = websiteId;
        var pageId = $routeParams['pid'];
        viewModel.pageid = pageId;

        //event handlers
        viewModel.getVideoURL =  getVideoURL;
        viewModel.getHTML = getHTML;
        viewModel.getWidgetURL = getWidgetURL;

        function init() {
            var promise =  WidgetService.findWidgetsByPageId(pageId);
            promise.then(function successCallback(response) {
                    var widgets = response.data;
                    if(widgets!= undefined) {
                        viewModel.widgets = widgets;
                    } else {
                        viewModel.error = "Error while loading Widgets for Page ID:" + pageId;
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "Error while loading Widgets for Page ID:" + pageId;
                });

        }
        init();

        function getVideoURL(url) {
            var urlContents = url.split("/");
            var urlId = urlContents[urlContents.length-1];

            var url = "https://www.youtube.com/embed/"+urlId;
            return $sce.trustAsResourceUrl(url);
        }

        function getHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function getWidgetURL(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }
    }
})();