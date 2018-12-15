using PersonalProject.interfaces;
using PersonalProject.Models;
using PersonalProject.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PersonalProject.Controllers
{
    [RoutePrefix("api/bank")]
    public class BankController : ApiController
    {

        readonly IBankServices bankServices;

        public BankController(IBankServices _bankServices)
        {
            bankServices = _bankServices;
        }

      [Route(""), HttpPost]
      public object Insert(BankAccountModel model)
        {
            return bankServices.Insert(model);
        }

        [Route(""), HttpGet]
        public List<BankAccountJoinModel> GetById(string id)
        {
            return bankServices.GetById(id);
        }
        
    }
}
