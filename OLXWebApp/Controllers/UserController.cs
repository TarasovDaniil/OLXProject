using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ApiOlx.Classes.Models;
using ApiOlx.Classes.Models.Categories;
using ApiOlx.Services;
using ExcelDataReader;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OlxSystem.Classes.Models;
using OLXWebApp.Database.Context;
using OLXWebApp.Database.DbModels;
using OLXWebApp.Models;

namespace OLXWebApp.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        private ApplicationContext db;
        private IWebHostEnvironment _appEnvironment;
        OlxApi olxApi;

        public UserController(ApplicationContext db, IWebHostEnvironment appEnvironment)
        {
            this.db = db;
            _appEnvironment = appEnvironment;
            olxApi = new OlxApi();
        }

        [AllowAnonymous]
        public IActionResult Accounts()
        {
            //User user = db.User.Where(u => u.Login == User.Identity.Name).FirstOrDefault();
            //var accounts = db.OLXAccount.Where(a => a.UserOwnerId == user.Id).ToList();
            //ViewBag.Accounts = accounts;
            return View();
        }
        // Test Data//////////////////////////////////////////////////////////////////////////////
        private string token = "840a444767f67693cdc82475c60dde0e9c7d5b73";
        List<AOuthRequest> aOuthRequests = new List<AOuthRequest>
        {
            new AOuthRequest
            {
                Access_token = "c2be4f3d50cb6c122345526348b5d589f4bc4880",
                Client_id = "200358",
                Client_secret = "oQHn4Ge13VQlrBlAO0FnvDEbVOQxTkMl5eOX217ZMPGzV5V2",
                Refresh_token = "6e71a5376ff2aac78b702703cdcff9791ce9e7b5"
            },
            new AOuthRequest
            {
                Access_token = "ba5862e1780810f9196816c842bed212519f5474",
                Client_id ="200359",
                Client_secret = "EKsvfQRvFco4FlGrkoCs6PRKDvrN7Q3tzt0KKVCqmcjwalQw",
                Refresh_token = "12242f11f7b6481c2fb440c730973cebb1364140"
            }
        };

        List<OLXAccount> oLXAccounts = new List<OLXAccount>
        {
            new OLXAccount()
            {
                Id = 0,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 1,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 2,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 3,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 4,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 5,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 6,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 7,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 8,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 9,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 10,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 11,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 12,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },

            new OLXAccount()
            {
                Id = 13,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },
            new OLXAccount()
            {
                Id = 14,
                Login = "log1",
                Name = "name1",
                Password = "pass1",
                Phone = "78999999999"
            },
        };
        ///////////////////////////////////////////////////////////////////////////////



        public IActionResult AddOLXAccount(OLXAccountModel account)
        {
            User user = db.Methods.GetUserByLogin(User.Identity.Name);

            db.Methods.AddOLXAccountIfNeed(account, user);

            return RedirectToAction("Accounts", "User");
        }

        //public IActionResult AddOLXAccountsFromExcelFile(IFormFile file)
        //{
        //    if (file.FileName.EndsWith(".xls") == false && file.FileName.EndsWith(".xlsx") == false) 
        //    {
        //        return RedirectToAction("Accounts", "User");
        //    }

        //    MemoryStream ms = new MemoryStream();
        //    file.CopyTo(ms);

        //    using (var reader = ExcelReaderFactory.CreateReader(ms))
        //    {
        //        User user = db.Methods.GetUserByLogin(User.Identity.Name);
        //        reader.Read(); // Заголовок прочитываем
        //        while (reader.Read()) //Each row of the file
        //        {
        //            OLXAccountModel model = new OLXAccountModel()
        //            {
        //                Login = reader.GetValue(0).ToString(),
        //                Password = reader.GetValue(1).ToString(),
        //                Name = reader.GetValue(2).ToString(),
        //                Phone = reader.GetValue(3).ToString(),

        //            };

        //            db.Methods.AddOLXAccountIfNeed(model, user);
        //        }
        //    }

        //    return RedirectToAction("Accounts", "User");
        //}


        [HttpGet]
        public IActionResult DeleteOLXAccount(int id)
        {
            OLXAccount delAcc = db.Methods.GetOLXAccountById(id);
            if (delAcc != null)
            {
                db.Methods.DeleteOLXAccount(delAcc);
            }

            return RedirectToAction("Accounts", "User");
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<JsonResult> GetCategories()
        {
            var jsonCa = await olxApi.GetCategorius(new AOuthRequest
            {
                Access_token = token,
            });
            return Json(jsonCa);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<JsonResult> GetAttribute(int id)
        {
            var jsonAtt = await olxApi.GetAttributes(id, new AOuthRequest
            {
                Access_token = token,
            });
            return Json(jsonAtt);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<JsonResult> GetChildsСategory(int categoryId)
        {
            var category = new Categories();
            category.Data = new List<ApiOlx.Classes.Models.Categories.Datum>();
            var jsonCa = await olxApi.GetCategorius(new AOuthRequest
            {
                Access_token = token
            });
            foreach (var cat in jsonCa.Data)
            {
                if (cat.ParentId == categoryId)
                {
                    category.Data.Add(cat);
                }
            }
            return Json(category);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<JsonResult> GetCities()
        {
            var cities = new Cities();
            cities.Data = new List<OlxSystem.Classes.Models.Datum>();
            var jsonCity = await olxApi.GetCitiesAsync(new AOuthRequest
            {
                Access_token = token
            });
            return Json(jsonCity);
        }

        [AllowAnonymous]
        [HttpGet]
        public JsonResult GetAccountsOlx(int page)
        {
            User user = new User { Id = 1 };//db.User.Where(u => u.Login == User.Identity.Name).FirstOrDefault();
            List<OLXAccount> OLXAccount = oLXAccounts.Skip(5 * (page - 1)).Take(5).ToList();

            //var accounts = db.OLXAccount.Where(a => a.UserOwnerId == user.Id).Skip(5*(page - 1)).Take(5).ToList();
            return Json(OLXAccount);
        }


        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddAccountOlx([FromForm] OLXAccount olxAccount)
        {
            //User user = db.Methods.GetUserByLogin(User.Identity.Name);
            //db.Methods.AddOLXAccountIfNeed(olxAccount, user);
            oLXAccounts.Add(olxAccount);
            return Json(olxAccount);
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult GetCountAccountsOlx()
        {
            //User user = new Database.DbModels.User { Id = 1}; //db.Methods.GetUserByLogin(User.Identity.Name);
            //var coutnAccs = db.Methods.GetCountAccountsOlx(user);
            var coutnAccs = oLXAccounts.Count;
            return Json(coutnAccs);
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task AddAdvert([FromBody] OLXProduct product)
        {
            foreach (var aOuth in aOuthRequests)
            {
                //aOuth.Access_token = (await olxApi.RefreshAccessToken(aOuth)).Access_token;
                //product.advertiser_type = "private";
                //await olxApi.CreateAdvert(product, aOuth);
            }
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IEnumerable<string>> AddPhoto(List<IFormFile> images)
        {
            List<string> paths = new List<string>();
            long size = images.Sum(f => f.Length);
            if (images != null && images.Count > 0)
            {
                foreach (var uploadedFile in images)
                {
                    // путь к папке Files
                    string path = "/Files/Photos/" + GetFileNameRnd() + uploadedFile.FileName;
                    // сохраняем файл в папку Files в каталоге wwwroot
                    using (var fileStream = new FileStream(_appEnvironment.WebRootPath + path, FileMode.Create))
                    {
                        await uploadedFile.CopyToAsync(fileStream);
                    }
                    //Photo photo = new Photo { Filename = uploadedFile.FileName, Path = path };
                    //db.Methods.AddPhoto(photo);
                    paths.Add("https://localhost:44379" + path);
                }
            }
            return paths;
        }
        private string GetFileNameRnd()
        {
            return Guid.NewGuid().ToString();
        }

        [HttpGet]
        public IActionResult Setting()
        {
            return View(new UserSettings() { Proxies = new List<string>()});
        }

        [HttpPost]
        public IActionResult Setting([FromBody]UserSettings settings)
        {
            ViewData["Settings"] = settings;
            ViewBag.Setting = settings;

            if (settings != null)
            {
                return View(settings);
            }
            return View();
        }
    }
}