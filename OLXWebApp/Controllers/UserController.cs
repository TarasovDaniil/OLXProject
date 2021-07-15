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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OLXWebApp.Database.Context;
using OLXWebApp.Database.DbModels;
using OLXWebApp.Models;

namespace OLXWebApp.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        private ApplicationContext db;
        OlxApi olxApi;

        public UserController(ApplicationContext db)
        {
            this.db = db;
            olxApi = new OlxApi();
        }

        public IActionResult Accounts()
        {
            User user = db.User.Where(u => u.Login == User.Identity.Name).FirstOrDefault();
            var accounts = db.OLXAccount.Where(a => a.UserOwnerId == user.Id).ToList();
            ViewBag.Accounts = accounts;
            return View();
        }

        public IActionResult AddOLXAccount(OLXAccountModel account)
        {
            User user = db.Methods.GetUserByLogin(User.Identity.Name);

            db.Methods.AddOLXAccountIfNeed(account, user);

            return RedirectToAction("Accounts", "User");
        }

        public IActionResult AddOLXAccountsFromExcelFile(IFormFile file)
        {
            if (file.FileName.EndsWith(".xls") == false && file.FileName.EndsWith(".xlsx") == false) 
            {
                return RedirectToAction("Accounts", "User");
            }

            MemoryStream ms = new MemoryStream();
            file.CopyTo(ms);

            using (var reader = ExcelReaderFactory.CreateReader(ms))
            {
                User user = db.Methods.GetUserByLogin(User.Identity.Name);
                reader.Read(); // Заголовок прочитываем
                while (reader.Read()) //Each row of the file
                {
                    OLXAccountModel model = new OLXAccountModel()
                    {
                        Login = reader.GetValue(0).ToString(),
                        Password = reader.GetValue(1).ToString(),
                        Name = reader.GetValue(2).ToString(),
                        Phone = reader.GetValue(3).ToString(),

                    };

                    db.Methods.AddOLXAccountIfNeed(model, user);
                }
            }

            return RedirectToAction("Accounts", "User");
        }


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

        private string token = "769e923543ea92b9bccd9a794ede3926cce3ff4c";
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
            var jsonAtt = await olxApi.GetAttributes(id,new AOuthRequest 
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
            category.Data = new List<Datum>();
            var jsonCa = await olxApi.GetCategorius(new AOuthRequest
            {
                Access_token = token,
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
    }

}