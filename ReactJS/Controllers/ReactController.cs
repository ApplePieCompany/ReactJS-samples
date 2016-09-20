using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace ReactJS.Controllers
{
    public class ReactController : Controller
    {
        // GET: React
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetName()
        {
            return Json(new { name = "World from Server side data with React state use" }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult PostData()
        {
            return Json(new { name = "data posted successfully" });
        }
    }
    public class model
    {

    }
}