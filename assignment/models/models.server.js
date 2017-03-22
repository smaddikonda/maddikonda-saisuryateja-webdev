module.exports = function() {
    var userModel = require('./user/user.model.server')();
    var websiteModel = require('./website/website.model.server')();
    var pageModel = require('./page/page.model.server')();
    var widgetModel = require('./widget/widget.model.server')();

    var model = {
        UserModel : userModel,
        WebsiteModel : websiteModel,
        PageModel : pageModel,
        WidgetModel : wodgetModel
    };


   /* UserModel.setModel(model);
    WebsiteModel.setModel(model);
    PageModel.setModel(model);
    WidgetModel.setModel(model);*/

    return model;
};