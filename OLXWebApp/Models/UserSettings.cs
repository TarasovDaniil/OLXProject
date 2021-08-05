using ApiOlx.Classes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OLXWebApp.Models
{
    public class UserSettings
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int? CountAddedAdvert { get; set; }
        public int? CountOlxAccount { get; set; }
        public List<string>? Proxies { get; set; }
        public string CaptchaKey { get;set;}
    }
}
