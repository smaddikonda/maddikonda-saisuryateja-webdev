(function () {

    angular
        .module("WebAppMaker")
        .directive("wbdvSortable", wbdvDirectives );

    function wbdvDirectives () {

        function linkFunc(scope,element) {
            element.sortable({
                    axis: "y", handle:'.glyphicon-align-justify'
                }
            );
        }
        return{
            link : linkFunc
        };
    }
})();