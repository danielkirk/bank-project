using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PersonalProject.Models
{
    public class UsersModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int GenreId { get; set; }
    }
}