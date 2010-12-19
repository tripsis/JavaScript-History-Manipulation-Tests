var jqueryHistoryHelper = function () {

    this.init = function (links) {

        // Check for support
        if (window.history && window.history.pushState) {

            // Set click event handlers
            _overrideClickEvents(links);

            // Store the current page in history so that if you go
            // back far enough to the original page, it has a valid
            // object state.
            _storeCurrentPage();

            // Bind popstate for handling history traversal
            $(window).bind("popstate", function (b) {
                _popStateHandler(b.originalEvent)
            });
        }
        else {
            alert("window.history.pushState is not supported in this browser");
        }
    };

    var _overrideClickEvents = function (links) {

        links.click(function () {

            // Get the URL of whatever we were clicking on
            var url = $(this).attr("href");

            // Load the content into the container on the current page
            _loadPageContent(url, function () {
                // Update the URL of the page.
                _setPageUrl(url);
            });

            return false;
        });

    };

    var _loadPageContent = function (url, successCallback) {

        // ==============================================================
        // NOTE
        // ==============================================================
        // Obviously, you wouldn't do things this way in production as
        // this method loads the page twice using AJAX, once for the 
        // content then again for the title.
        // 
        // But, this is just a sample of how the history push works so
        // it's not worth refining at the moment. In a production
        // environment, you'd likely be loading page content from a DB
        // so could return the title and content as part of a JSON object.
        // ==============================================================

        // Load the #main content from the target page into this page
        $("#main").load(url + " #main", function () {

            // Load the page title
            $.get(url, function (response) {

                // A little hacky; this will fail (on Chrome at least) if there's
                // a line break in the <title> tag.
                var title = (/<title>(.*?)<\/title>/m).exec(response)[1];
                $("title").text(title);
            });

            if (successCallback) {
                successCallback(url);
            }

        });
    };

    var _storeCurrentPage = function () {
        // Stores the current page in the window history.
        var url = window.location.pathname;
        window.history.replaceState(url, url, url);
    };

    var _setPageUrl = function (url) {
        // PushState Signature: window.history.pushState([State Object], [Page Title], [Page URL]);
        //
        // In this example, we're just adding the URL to the state object but we could
        // add the entire page content if we wanted (although this could cause the memory
        // to grow very quickly and wouldn't update with changes to the page on the server).
        window.history.pushState(url, url, url);
    };

    // Handles the user moving through browser history.
    var _popStateHandler = function (event) {
        if (event.state) {
            // event.state is the first parameter added to the pushState's State Object (in this case, a URL).
            var url = event.state;
            if (url) {
                _loadPageContent(url);
            }
        }
    };

};

var historyHelper = new jqueryHistoryHelper();