using PersonalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalProject.interfaces
{
    public interface IBankServices
    {
        int Insert(BankAccountModel model);
        List<BankAccountJoinModel> GetById(string id);
        object InsertTransaction(BankAccountTransactionModel model);
        AspEmail GetUserByEmail(string Email);
        AspIdModel GetBankAccountByAspNetId(string AspNetId);
    }
}
