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
    public class GetVitalSignDataController : BaseDBController
    {
        // GET: api/getVitalSignData/5
        [HttpGet("{admittanceID}")]
        public IEnumerable<VitalSignsItem> Get(int admittanceID)
        {
            var res = DbContext.Vital.Where(item => item.AdmittanceId == admittanceID).OrderBy(ke => ke.Timestamp.Value.Hour);
            return Mapper.Map(res); 
        }
    }
}
