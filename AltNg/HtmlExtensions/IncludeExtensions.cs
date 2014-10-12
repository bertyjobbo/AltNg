using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AltNg.HtmlExtensions
{
    public static class IncludeExtensions
    {
        public static MvcHtmlString MinimizedScript(this HtmlHelper html, string path, string version=null)
        {
            #if !DEBUG
                path = path.Replace(".js",".min.js");
            #endif


            return MvcHtmlString.Create(string.Format("<script src=\"{0}\"></script>", VirtualPathUtility.ToAbsolute(path) + (string.IsNullOrEmpty(version) ? version : "?v=" + version)));
        }

        public static MvcHtmlString MinimizedStylesheet(this HtmlHelper html, string path, string version = null)
        {
            #if !DEBUG
                path = path.Replace(".css",".min.css");
            #endif

            return MvcHtmlString.Create(string.Format("<link rel=\"stylesheet\" href=\"{0}\" />", VirtualPathUtility.ToAbsolute(path) + (string.IsNullOrEmpty(version) ? version : "?v=" + version)));
        }
    }
}