using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ERDashboard.Models.DTO;
using ERDashboard.Models;
using ERDashboard.Models.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ERDashboard.Controllers
{
    [Route("api/[controller]")]
    public class OrdersDataController : BaseDBController
    {
        // GET: api/ordersData/1
        [HttpGet("{admittanceID}")]
        public IEnumerable<OrderItem> Get(int admittanceID)
        {
            IQueryable<Order> res = DbContext.Order.Where(item => item.AdmittanceId == admittanceID).AsQueryable();
            return Mapper.Map(res);
        }
    }
}
