using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ERDashboard.Models.DTO;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ERDashboard.Controllers
{
    [Route("api/[controller]")]
    public class MedTestsTypesController : BaseDBController
    {
        // GET: api/medTestsTypes
        [HttpGet]
        public IEnumerable<Models.ViewModels.ItemType> Get()
        {
            return Mapper.Map(DbContext.TestType);
        }
        
    }
}
