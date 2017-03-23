module.exports = function() {
    var userModel = require('./user/user.model.server')();
    var websiteModel = require('./website/website.model.server')();
    var pageModel = require('./page/page.model.server')();
    var widgetModel = require('./widget/widget.model.server')();

    var model = {
        UserModel : userModel,
        WebsiteModel : websiteModel,
        PageModel : pageModel,
        WidgetModel : widgetModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};