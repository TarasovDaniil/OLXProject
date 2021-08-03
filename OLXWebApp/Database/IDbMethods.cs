using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OLXWebApp.Database.DbModels;
using OLXWebApp.Models;

namespace OLXWebApp.Database
{
    public interface IDbMethods
    {
        void AddUser(User u);
        Role GetUserRole(User user);
        User GetUserByLoginPassword(LoginModel model);
        Role GetRole_USER();
        List<User> GetAllUsersByRole(Role role);
        void AddUserByLoginModel(LoginModel model, Role userRole);
        User GetUserById(int id);
        void DeleteUser(User user);
        User GetUserByLogin(string login);
        void AddOLXAccountIfNeed(OLXAccountModel accModel, User owner);
        OLXAccount GetOLXAccountById(int id);
        void DeleteOLXAccount(OLXAccount account);
        int GetCountAccountsOlx(User owner);
        void AddPhoto(Photo photo);
    }
}
