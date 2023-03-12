using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class AreaMaster
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string AreaCode { get; set; }
        public string AreaDesc { get; set; }
        public bool IsActive { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModidfiedDate { get; set; }
    }
}
