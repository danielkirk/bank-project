using HtmlAgilityPack;
using PersonalProject.Areas.HelpPage.Interface;
using PersonalProject.interfaces;
using PersonalProject.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace PersonalProject.Services
{
    public class DanielServices : IDanielService
    {
        private IDataProvider _dataProvider;

        public DanielServices(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public object ScrapeTrailer(URLmodel model)
        {
            var TrailerList = new List<TrailerModel>();
            var url = "https://www.imdb.com/movies-in-theaters/?ref_=cs_inth";

            var web = new HtmlWeb();
            var htmlDoc = web.Load(url);

            var Description = htmlDoc.DocumentNode.SelectNodes("//*[@id='main']/div/div/div/table/tbody/tr/td[2]/div[2]");
            var Trailer = htmlDoc.DocumentNode.SelectNodes("//*[@id='main']/div/div/div/table/tbody/tr/td/a[1]");


            foreach (var node in Trailer.Zip(Description, (t, d) => new TrailerModel
            {
                Trailer = t.GetAttributeValue("href", ""),
                Description = d.InnerText
            }))
            {
                TrailerList.Add(node);

            }
            return (TrailerList);
        }

        public object ScrapeWeb(URLmodel model)
        {
            var WebList = new List<WebModel>();
            var url = "https://www.imdb.com/movies-in-theaters/?ref_=cs_inth";

            var web = new HtmlWeb();
            var htmlDoc = web.Load(url);
            var Title = htmlDoc.DocumentNode.SelectNodes("//*[@id='main']/div/div/div/table/tbody/tr/td/h4/a");
            var Image = htmlDoc.DocumentNode.SelectNodes("//*[@id='img_primary']/div/a/div/img");

            foreach (var node in Title.Zip(Image, (t, i) => new WebModel
            { Title = t.InnerText, Image = i.GetAttributeValue("src", "") }))
            {
                WebList.Add(node);
                Console.WriteLine(node);
            }
            return (WebList);
        }

        public object ScrapeTickets(URLmodel model)
        {
            var TicketList = new List<TicketModel>();
            var url = "https://www.imdb.com/movies-in-theaters/?ref_=cs_inth";
            var web = new HtmlWeb();
            var htmlDoc = web.Load(url);
            var Ticket = htmlDoc.DocumentNode.SelectNodes("//*[@id='main']/div/div/div/table/tbody/tr/td/a[2]");
            var BoxOffice = htmlDoc.DocumentNode.SelectNodes("//*[@id='main']/div/div/div/table/tbody/tr/td/div[5]");
            foreach (var node in Ticket.Zip(BoxOffice, (t, b) => new TicketModel
            { TicketUrl = t.GetAttributeValue("href", ""), BoxOffice = b.InnerText }))
            {
                TicketList.Add(node);

            }
            return (TicketList);
        }

        public int Create(UsersAddRequest model)
        {
            int id = 0;
            this._dataProvider.ExecuteNonQuery(
                "Users_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    SqlParameter param = new SqlParameter();
                    param.ParameterName = "@Id";
                    param.SqlDbType = System.Data.SqlDbType.Int;
                    param.Direction = System.Data.ParameterDirection.Output;
                    paramList.Add(param);

                    paramList.AddWithValue("@FirstName", model.FirstName);
                    paramList.AddWithValue("@LastName", model.LastName);
                    paramList.AddWithValue("@Email", model.Email);
                    paramList.AddWithValue("@GenreId", model.GenreId);
                },
                returnParameters: delegate (SqlParameterCollection paramList)
                {
                    id = (int)paramList["@Id"].Value;
                });

            return id;
        }

        public UsersModel GetById(int id)
        {
            UsersModel model = new UsersModel();
            this._dataProvider.ExecuteCmd(
                "Users_SelectById",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    model = MapUser(reader, index);
                });
            return model;
        }

        public static UsersModel MapUser(IDataReader reader, int index)
        {
            UsersModel model = new UsersModel();
            model.Id = reader.GetInt32(index++);
            model.FirstName = reader.GetString(index++);
            model.LastName = reader.GetString(index++);
            model.Email = reader.GetString(index++);
            model.GenreId = reader.GetInt32(index++);

            return model;
        }

        public int Update(UsersModel model)
        {
            int id = 0;
            this._dataProvider.ExecuteNonQuery(
                "Users_Update",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@Id", model.Id);
                    paramList.AddWithValue("@FirstName", model.FirstName);
                    paramList.AddWithValue("@LastName", model.LastName);
                    paramList.AddWithValue("@Email", model.Email);
                    paramList.AddWithValue("@GenreId", model.GenreId);
                },
                returnParameters: delegate (SqlParameterCollection paramList)
                {
                    id = (int)paramList["@Id"].Value;
                });
            return id;
        }

        public void Delete(int id)
        {
            this._dataProvider.ExecuteNonQuery(
                "Users_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@Id", id);
                });
        }
    } 
}
