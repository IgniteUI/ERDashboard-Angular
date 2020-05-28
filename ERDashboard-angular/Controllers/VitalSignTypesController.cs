using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ERDashboard.Models.DTO;
using ERDashboard.Models.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ERDashboard.Controllers
{
    [Route("api/[controller]")]
    public class VitalSignTypesController : BaseDBController
    {
        // GET: api/vitalSignTypes
        [HttpGet]
        public IEnumerable<ItemType> Get()
        {
            var res = DbContext.VitalSignType;
            return Mapper.Map(res);
        }


    }
}
