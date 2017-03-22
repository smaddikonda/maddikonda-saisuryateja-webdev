(function () {
    angular
        .module("WebAppMaker")
        .directive("wbdvSortable", wbdvDirectives);

    function wbdvDirectives () {
        function linkFunc(scope, element) {
            element.sortable({
                start: function () {
                    
                },

                stop: function () {

                },

                    axis: "y", handle:'.glyphicon-align-justify'
                }
            );
        }
        return{
            link : linkFunc
        };
    }
})();