using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Website.Models;

namespace Website.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var pageContent = GetPageContent(Page.Home);

            if (Request.IsAjaxRequest())
            {
                return Json(new
                                {
                                    title = pageContent.Title,
                                    content = pageContent.Content
                                });
            }

            return View(pageContent);
        }

        public ActionResult About()
        {
            var pageContent = GetPageContent(Page.About);

            if (Request.IsAjaxRequest())
            {
                return Json(new
                {
                    title = pageContent.Title,
                    content = pageContent.Content
                });
            }

            return View(pageContent);
        }

        public ActionResult Contact()
        {
            var pageContent = GetPageContent(Page.Contact);

            if (Request.IsAjaxRequest())
            {
                return Json(new
                {
                    title = pageContent.Title,
                    content = pageContent.Content
                });
            }

            return View(pageContent);
        }

        private enum Page
        {
            Home, About, Contact
        }

        private static PageContent GetPageContent(Page page)
        {
            string pageContent = String.Format("Page rendered at {0}.", DateTime.Now);

            switch (page)
            {
                case Page.About:
                    return new PageContent("About", pageContent);

                case Page.Contact:
                    return new PageContent("Contact", pageContent);

                case Page.Home:
                    return new PageContent("Home", pageContent);
            }

            throw new InvalidEnumArgumentException("page", (int)page, typeof(Page));
        }

    }
}
