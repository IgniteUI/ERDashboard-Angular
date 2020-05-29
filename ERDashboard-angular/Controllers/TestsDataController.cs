using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ERDashboard.Controllers
{
    [Route("api/[controller]")]
    public class TestsDataController : BaseDBController
    {
        // GET: api/testsData/1
        [HttpGet("{admittanceID}")]
        public IEnumerable<ERDashboard.Models.Test> Get(int admittanceID)
        {
            return DbContext.Test.Where(item => item.AdmittanceId == admittanceID).OrderBy(o => o.Timestamp.Value.Hour);
        }

    }
}
