module.exports = function (app) {
    /*
    var userModel = require('./models/user/user.model.server');
    var websiteModel = require('./models/website/website.model.server');
    var pageModel = require('./models/page/page.model.server');
    var widgetModel = require('./models/widget/widget.model.server');
    */

    var models = require('./models/models.server');
    require('./services/user.service.server.js')(app, models.UserModel);
    require('./services/website.service.server.js')(app, models.WebsiteModel);
    require('./services/page.service.server.js')(app, models.PageModel);
    require('./services/widget.service.server.js')(app, models.WidgetModel);
};