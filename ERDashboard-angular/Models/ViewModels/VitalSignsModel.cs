using System;
using System.Collections.Generic;

namespace ERDashboard.Models.ViewModels
{
    public class VitalSignsModel
    {
        public IEnumerable<ViewModels.ItemType> VitalSignsTypes { get; set; }
        public IEnumerable<VitalSignsItem> VitalSignsForPatient { get; set; }
    }
}