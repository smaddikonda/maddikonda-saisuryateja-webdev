module.exports = function (app) {

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/allwidget",findAllWidgetsForPage);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);


    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads'});
    app.post("/api/upload", upload.single('imageFile'), uploadImage);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO","name":"heading text"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum","name":"sub text 1"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "text": "random image",
            "url": "http://lorempixel.com/400/200/","name":"image1"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum HTML content</p>" ,"name":"html1"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum","name":"sub text 2"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" ,"name":"video 1"},
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum HTML content</p>" ,"name":"html2"}
    ];

    var allWidgetTypes = ["HEADER","IMAGE","HTML","YOUTUBE"];

    function uploadImage(req, res) {

        var widget = req.body;
        var pageId = req.body.pageid;
        widget.pageId = pageId;

        if(widget.widgetId == "")
        {
            var widgetId = Math.floor(Date.now() / 1000);
            if(req.file!=undefined)
            {
                var myFile = req.file;
                var url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
                widget.url = url;
            }
            else{
                widget.url = req.body.url;
            }
            widget._id = widgetId;
            widget.widgetType = "IMAGE";
            widget.name = req.body.name;
            widget.text = req.body.text;
            widget.width =  req.body.width;

            widgets.push(widget);
        }
        else
        {
            for (var w in widgets)
            {
                if(widgets[w]._id === widget.widgetId)
                {
                    widgets[w].width = widget.width;
                    widgets[w].name = widget.name;
                    widgets[w].text = widget.text;

                    if(req.file!=undefined)
                    {
                        var myFile = req.file;
                        var url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
                        widgets[w].url = url;
                    }
                    else{
                        widgets[w].url = widget.url;
                    }
                }
            }

            widget._id = widget.widgetId;
        }
        var callback = "/assignment/index.html#/user/" + req.body.userid + "/website/" + req.body.websiteid + "/page/" + req.body.pageid + "/widget/";

        res.redirect(callback);
    }


    function createWidget(req,res){
        var pageId = req.params.pageId;
        var widget = req.body;
        var widgetId = Math.floor(Date.now() / 1000);
        var widgetDetails =
            {   "_id":widgetId,
                "widgetType":widget.widgetType,
                "pageId": pageId,
                "width" :widget.width,
                "size" : widget.size,
                "url":widget.url,
                "text":widget.text,
                "name":widget.name
            };

        widgets.push(widgetDetails);
        res.json(widgetDetails);
    }

    function findAllWidgetsForPage(req,res){
        var pageId = req.params.pageId;
        var allWidgets = [];
        for(wi in allWidgetTypes){
            allWidgets.push(allWidgetTypes[wi]);
        }
        res.json(allWidgets);
    }

    function findWidgetsByPageId(req,res){
        var pageId = req.params.pageId;
        var widgetsByPage = [];
        for(wi in widgets){
            if(widgets[wi].pageId == pageId){
                widgetsByPage.push(widgets[wi]);
            }
        }
        res.json(widgetsByPage);
    }
    function findWidgetById(req,res){
        var widgetId = req.params.widgetId;
        for(wi in widgets) {
            if (widgets[wi]._id == widgetId) {
                res.json(widgets[wi]);
            }
        }
        res.json(null);
    }
    function updateWidget(req,res){
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(wi in widgets) {
            if (widgets[wi]._id == widgetId) {
                widgets[wi].name = widget.name;
                widgets[wi].text = widget.text;
                widgets[wi].size = widget.size;
                widgets[wi].width = widget.width + "%";
                widgets[wi].url = widget.url;
                res.json(widgets[wi]);
            }
        }
        res.json(null);
    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;
        for(wi in widgets) {
            if (widgets[wi]._id == widgetId) {
                widgets.splice(wi, 1);
                res.json(widgetId);
            }
        }
        res.json(null);
    }
    
    function getWidgetById(widgetID) {
        for(wi in widgets) {
            if (widgets[wi]._id == widgetID) {
                return widgets[wi];
            }
        }
    }
};