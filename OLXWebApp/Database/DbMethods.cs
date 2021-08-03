using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using OLXWebApp.Database.Context;
using OLXWebApp.Database.DbModels;
using OLXWebApp.Models;

namespace OLXWebApp.Database
{
    public class DbMethods : IDbMethods
    {
        private ApplicationContext db;
        
        public DbMethods(ApplicationContext appContext)
        {
            this.db = appContext;
        }

        public void AddUser(User u)
        {
            
        }

        public Role GetUserRole(User user)
        {
            return db.Role.FirstOrDefaultAsync(r => r.Id == user.RoleId).Result;
        }

        public User GetUserByLoginPassword(LoginModel model)
        {
            return db.User.FirstOrDefault(u => u.Login == model.Login && u.Password == model.Password);
        }

        public Role GetRole_USER()
        {
            return db.Role.FirstOrDefault(r => r.Name == "user");
        }

        public List<User> GetAllUsersByRole(Role role)
        {
            return db.User.Where(u => u.RoleId == role.Id).ToList();
        }

        public void AddUserByLoginModel(LoginModel model, Role role)
        {
            User newUser = new User
            {
                Login = model.Login,
                Password = model.Password,
                RoleId = role.Id,
            };
            db.User.Add(newUser);
            db.SaveChanges();
        }

        public User GetUserById(int id)
        {
            return db.User.Where(u => u.Id == id).FirstOrDefault();
        }

        public void DeleteUser(User user)
        {
            db.User.Remove(user);
            db.SaveChanges();
        }

        public User GetUserByLogin(string login)
        {
            return db.User.Where(u => u.Login == login).FirstOrDefault();
        }

        public void AddOLXAccountIfNeed(OLXAccountModel accModel, User owner)
        {
            if (db.OLXAccount.Where(a => a.Login == accModel.Login).FirstOrDefault() == null)
            {
                OLXAccount newAccount = new OLXAccount()
                {
                    Login = accModel.Login,
                    Password = accModel.Password,
                    Name = accModel.Name,
                    Phone = accModel.Phone,
                    UserOwnerId = owner.Id,
                };
                db.OLXAccount.Add(newAccount);
                db.SaveChanges();
            }
        }

        public OLXAccount GetOLXAccountById(int id)
        {
            return db.OLXAccount.Where(u => u.Id == id).FirstOrDefault();
        }

        public void DeleteOLXAccount(OLXAccount account)
        {
            db.OLXAccount.Remove(account);
            db.SaveChanges();
        }

        public int GetCountAccountsOlx(User owner)
        {
            var countOlxAccounts = db.OLXAccount.Where(user => user.UserOwnerId == owner.Id).Count();
            return countOlxAccounts;
        }

        public void AddPhoto(Photo photo)
        {
            if (photo != null)
            {
               var result = db.Add(photo);
                db.SaveChanges();
            }
        }
    }
}