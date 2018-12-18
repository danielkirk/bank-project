using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using PersonalProject.Areas.HelpPage.Interface;
using PersonalProject.Controllers;
using PersonalProject.interfaces;
using PersonalProject.Models;
using PersonalProject.Providers;
using PersonalProject.Services;
using System.Configuration;
using System.Web.Http;
using System.Web.Mvc;
using Unity;
using Unity.Injection;
using Unity.WebApi;

namespace PersonalProject
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            container.RegisterType<IDataProvider,SqlDataProvider>(
               new InjectionConstructor(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString));

            container.RegisterType<IUserStore<ApplicationUser>, UserStore<ApplicationUser>>();
            container.RegisterType<AccountController>(new InjectionConstructor());
            container.RegisterType<IBankServices, BankServices>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);

            DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(container));
        }
    }
}