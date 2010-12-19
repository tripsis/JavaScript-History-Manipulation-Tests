using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Website.Models
{
    public class PageContent
    {
        public PageContent(string title, string content)
        {
            this.Title = title;
            this.Content = content;
        }

        public string Title { get; set; }
        public string Content { get; set; }
    }
}