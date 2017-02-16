(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem",    created: new Date() },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem",    created: new Date() },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem",    created: new Date() },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem",    created: new Date() },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem",    created: new Date() },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem",    created: new Date() }
        ];

        var api = {
            "createWebsite" : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };

        return api;

        function createWebsite(userid, website) {
            var newWebsite = {
                "_id" : Math.floor(Date.now() / 1000),
                "name" : website.name,
                "developerId" : userid,
                "description" : website.description,
                "created" : new Date()
            };
            websites.push(newWebsite);
            return newWebsite;
        }

        function findWebsitesByUser(userid) {
            var websitesByUser= [];
            for(var w in websites) {
                var website = websites[w];
                if(website.developerId == userid) {
                    websitesByUser.push(website);
                }
            }
            if(websitesByUser.length != 0) {
                return websitesByUser;
            } else {
                return null;
            }
        }

        function findWebsiteById(websiteid) {
            for(var w in websites) {
                var website = websites[w];
                if(website._id == websiteid) {
                    return angular.copy(website);
                }
            }
            return null;
        }

        function updateWebsite(websiteid, website) {
            for (var w in websites) {
                var ws = websites[w];
                if(ws._id == websiteid) {
                    ws.name = website.name;
                    ws.description = website.description;
                    return ws;
                }
            }
            return null;
        }

        function deleteWebsite(websiteid) {
            for (var w in websites) {
                var ws = websites[w];
                if (ws._id == websiteid) {
                    websites.splice(w, 1);
                }
            }
        }
    }
})();