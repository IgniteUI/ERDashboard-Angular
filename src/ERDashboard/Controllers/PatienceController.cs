﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ERDashboard.Models;

namespace ERDashboard.Controllers
{
    [Route("api/[controller]")]
    public class PatientsController : BaseDBController
    {
        // GET api/patients
        [HttpGet]
        public IEnumerable<Models.ViewModels.Patient> Get()
        {
            var res = DbContext.Admittance.Include(x=>x.Patient).AsQueryable();
            return ERDashboard.Models.DTO.Mapper.Map(res, Url.Content("~/Content/images"));
        }

    }
}
