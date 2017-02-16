(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER",     "pageid": "789", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER",     "pageid": "789", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE",      "pageid": "789", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML",       "pageid": "789", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER",     "pageid": "789", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE",    "pageid": "789", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML",       "pageid": "789", "text": "<p>Lorem ipsum</p>"}
        ];

        var allWidgetTypes = ["HEADER", "IMAGE", "HTML", "YOUTUBE"];

        var api = {
            "createWidget" : createWidget,
            "findAllWidgets" : findAllWidgets,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget
        };

        return api;

        function createWidget(pageid, widget){
            var widgetDetails =
                {   "_id": Math.floor(Date.now() / 1000),
                    "widgetType":widget.widgetType,
                    "pageid": pageid,
                    "width" :widget.width,
                    "size" : widget.size,
                    "url":widget.url,
                    "text":widget.text,
                    "name":widget.name
                };
            widgets.push(widgetDetails);
            return widgetDetails;
        }

        function findAllWidgets(pageid){
            var allWidgets = [];
            for(var wi in allWidgetTypes){
                allWidgets.push(allWidgetTypes[wi]);
            }
            return allWidgets;
        }

        function findWidgetsByPageId(pageid){
            var widgetsByPage = [];
            for(var wi in widgets){
                if(widgets[wi].pageid == pageid){
                    widgetsByPage.push(angular.copy(widgets[wi]));
                }
            }
            return widgetsByPage;
        }

        function findWidgetById(widgetid){
            for(var wi in widgets) {
                if (widgets[wi]._id == widgetid) {
                    return angular.copy(widgets[wi]);
                }
            }
            return null;
        }

        function updateWidget(widgetid, widget){
            for(var wi in widgets) {
                if (widgets[wi]._id == widgetid) {
                    widgets[wi].name = widget.name;
                    widgets[wi].text = widget.text;
                    widgets[wi].size = widget.size;
                    widgets[wi].width = widget.width + "%";
                    widgets[wi].url = widget.url;
                    return widgets[wi];
                }
            }
            return null;
        }

        function deleteWidget(widgetid){
            for(var wi in widgets) {
                if (widgets[wi]._id == widgetid) {
                    widgets.splice(wi, 1);
                    return widgetid;
                }
            }
            return null;
        }
    }
})();