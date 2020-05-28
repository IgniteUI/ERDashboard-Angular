using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ERDashboard.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ERDashboard.Controllers
{
    public abstract class BaseDBController : Controller
    {
      /*
       Wraps the DBContext object for database access. Overrides IDisposable to release DB resources.
      */
        private MedicalDataEntities _dbContext = new MedicalDataEntities();
        public MedicalDataEntities DbContext
        {
            get
            {
                if (_dbContext == null)
                    _dbContext = new MedicalDataEntities();

                return _dbContext;
            }
        }

        #region IDisposable

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
            base.Dispose(disposing);
        }

        #endregion
    }
}
