using PersonalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalProject.interfaces
{
    public interface IDanielService
    {
        object ScrapeWeb(URLmodel model);
        object ScrapeTrailer(URLmodel model);
        object ScrapeTickets(URLmodel model);
        int Create(UsersAddRequest model);
        UsersModel GetById(int id);
        int Update(UsersModel model);
        void Delete(int id);
    }
}
