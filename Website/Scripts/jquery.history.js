var jqueryHistoryHelper = function () {

    this.init = function (links) {

        // Check for support
        if (window.history && window.history.replaceState) {
            _overrideClickEvents(links);
        }
        else {
            alert("not supported");
        }
    };

    var _overrideClickEvents = function (links) {

        links.click(function () {

            // Get the URL of whatever we were clicking on
            var url = $(this).attr("href");

            // Load the content into the container on the current page
            $("#main").load(url + " #main", function () {
                // Update the URL of the page.
                _setPageUrl(url);
            });

            return false;
        });

    };

    var _setPageUrl = function (url) {
        window.history.replaceState(null, null, url);
    };

};

var historyHelper = new jqueryHistoryHelper();