using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PersonalProject.Models
{
    public class BankAccountModel
    {
        public string Email { get; set; }
        public decimal Value { get; set; }
        public string AspNetUserId { get; set; }
    }
}