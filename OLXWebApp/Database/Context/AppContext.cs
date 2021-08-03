using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OLXWebApp.Database.DbModels;

namespace OLXWebApp.Database.Context
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<OLXAccount> OLXAccount { get; set; }
        public DbSet<Photo> Photo { get; set; }

        private IDbMethods _methods;
        public IDbMethods Methods { 
            get
            {
                if (_methods == null)
                {
                    _methods = new DbMethods(this);
                }

                return _methods;
            }
            set { _methods = value; }
        }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
           
        }
    }
}
