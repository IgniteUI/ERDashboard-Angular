using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ERDashboard.Controllers
{
    [Route("api/[controller]")]
    public class UtilsController : Controller
    {
        // GET: api/utils
        [HttpGet]
        public string Get()
        {
            string showcaseLangauge = GetUserResourceFile(Request.Headers["Accept-Language"]);
            return showcaseLangauge;
        }

        private string GetUserResourceFile(string acceptLanguage)
        {
            string language = "en";

            if (!string.IsNullOrWhiteSpace(acceptLanguage))
            {
                //  Get all languages the user accepts
                string[] languages = acceptLanguage.Split(';')[0].Split(',');

                foreach (var lang in languages)
                {
                    string baseLang = lang.Split('-')[0];
                    if (baseLang == "en" || baseLang == "ja")
                    {
                        language = baseLang;
                        break;
                    }
                }
            }
            return language;
        }

        #region Custom Data Structures

        class ShowcaseLanguage
        {
            public string ResourceFile { get; set; }
            public string Language { get; set; }
        }

        #endregion
    }
}
