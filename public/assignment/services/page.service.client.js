(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "123",     "name": "Post 1", "websiteid": "123", "description": "Lorem", created: new Date() },
            { "_id": "234",     "name": "Post 2", "websiteid": "123", "description": "Lorem", created: new Date() },
            { "_id": "345",     "name": "Post 3", "websiteid": "234", "description": "Lorem", created: new Date() },
            { "_id": "456",     "name": "Post 1", "websiteid": "234", "description": "Lorem", created: new Date() },
            { "_id": "567",     "name": "Post 2", "websiteid": "456", "description": "Lorem", created: new Date() },
            { "_id": "678",     "name": "Post 3", "websiteid": "456", "description": "Lorem", created: new Date() },
            { "_id": "789",     "name": "Post 1", "websiteid": "567", "description": "Lorem", created: new Date() },
            { "_id": "8910",    "name": "Post 2", "websiteid": "567", "description": "Lorem", created: new Date() },
            { "_id": "91011",   "name": "Post 3", "websiteid": "678", "description": "Lorem", created: new Date() },
            { "_id": "101112",  "name": "Post 1", "websiteid": "678", "description": "Lorem", created: new Date() },
            { "_id": "111213",  "name": "Post 2", "websiteid": "789", "description": "Lorem", created: new Date() },
            { "_id": "121314",  "name": "Post 3", "websiteid": "789", "description": "Lorem", created: new Date() },
        ];

        var api = {
            "createPage" : createPage,
            "findPageByWebsiteById" : findPageByWebsiteById,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };

        return api;

        function createPage(websiteid, page) {
            var newPage = {
                "_id" : Math.floor(Date.now() / 1000),
                "name" : page.name,
                "websiteid" : websiteid,
                "description" : page.description,
                "created" : new Date()
            };
            pages.push(newPage);
            return newPage;
        }

        function findPageByWebsiteById(websiteid) {
            var pagesByWebsite= [];
            for(var p in pages) {
                var page = pages[p];
                if(page.websiteid == websiteid) {
                    pagesByWebsite.push(page);
                }
            }
            if(pagesByWebsite.length != 0) {
                return pagesByWebsite;
            } else {
                return null;
            }
        }

        function findPageById(pageid) {
            for(var p in pages) {
                var page = pages[p];
                if(page._id == pageid) {
                    return angular.copy(page);
                }
            }
            return null;
        }

        function updatePage(pageid, page) {
            for (var p in pages) {
                var pg = pages[p];
                if(pg._id == pageid) {
                    pg.name = page.name;
                    pg.description = page.description;
                    return pg;
                }
            }
            return null;
        }

        function deletePage(pageid) {
            for (var p in pages) {
                var pg = pages[p];
                if (pg._id == pageid) {
                    pages.splice(p, 1);
                }
            }
        }
    }
})();