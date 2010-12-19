﻿var jqueryHistoryHelper = function () {

    this.init = function (links) {

        // Check for support
        if (window.history && window.history.pushState) {
            _overrideClickEvents(links);
            $(window).bind("popstate", function (b) {
                _popStateHandler(b.originalEvent)
            });
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
            _loadPageContent(url, function () {
                // Update the URL of the page.
                _setPageUrl(url);
            });

            return false;
        });

    };

    var _loadPageContent = function (url, successCallback) {
        // Load the #main content from the target page into this page
        $("#main").load(url + " #main", function () {
            if (successCallback) {
                successCallback(url);
            }
        });
    };

    var _setPageUrl = function (url) {
        window.history.pushState(url, url, url);
    };

    var _popStateHandler = function (event) {
        if (event.state) {
            var url = event.state;
            if (url) {
                _loadPageContent(url);
            }
        }
    };

};

var historyHelper = new jqueryHistoryHelper();