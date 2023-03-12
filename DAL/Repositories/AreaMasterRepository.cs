using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class AreaMasterRepository : Repository<AreaMaster>, IAreaMasterRepository
    {
        public AreaMasterRepository(DbContext context) : base(context){ }
    }
}
