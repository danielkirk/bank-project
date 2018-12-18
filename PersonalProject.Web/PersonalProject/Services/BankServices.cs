using PersonalProject.interfaces;
using PersonalProject.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace PersonalProject.Services
{
    public class BankServices : IBankServices

    {
        public int Insert(BankAccountModel model)
        {
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand("BankAccounts_Insert", conn))
                {

                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    SqlParameter param = new SqlParameter();
                    param.ParameterName = "@Id";
                    param.Direction = System.Data.ParameterDirection.Output;
                    param.SqlDbType = System.Data.SqlDbType.Int;

                    cmd.Parameters.Add(param);
                    cmd.Parameters.AddWithValue("@Email", model.Email);
                    cmd.Parameters.AddWithValue("@Value", model.Value);
                    cmd.Parameters.AddWithValue("@AspNetUserId", model.AspNetUserId);

                    cmd.ExecuteNonQuery();
                    int id = (int)cmd.Parameters["@Id"].Value;
                    return id;
                }
            }
        }

        public List<BankAccountJoinModel> GetById(string id)
        {
            using(SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand("BankAccountJoinView" , conn))
                {
                    List<BankAccountJoinModel> result = new List<BankAccountJoinModel>();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AspNetUserId", id);

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        BankAccountJoinModel model = new BankAccountJoinModel();
                        int idx = 0;
                        model.BankAccountId = reader.GetInt32(idx++);
                        model.AspNetUserId = reader.GetString(idx++);
                        model.TransactionId = reader.GetInt32(idx++);
                        model.TransactionAmount = reader.GetDecimal(idx++);
                        model.TransactionDate = reader.GetDateTime(idx++);
                        result.Add(model);
                    }
                     return result;
                }
            }
        }

        public AspEmail GetUserByEmail(string Email)
        {
            using(SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand("AspNetUsers_SelectByUserName", conn))
                {
                        AspEmail model = new AspEmail();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserName", Email);

                    SqlDataReader reader = cmd.ExecuteReader();
                        reader.Read();
                        int idx = 0;
                        model.AspId = reader.GetString(idx);
                        return model;
                }
            }
        }

        public AspIdModel GetBankAccountByAspNetId(string AspNetId)
        {
            using(SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand("UserBankAccountJoin_View", conn))
                {
                    AspIdModel model = new AspIdModel();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AspNetUserId", AspNetId);

                    SqlDataReader reader = cmd.ExecuteReader();
                    reader.Read();
                    int idx = 0;
                    model.AspNetUserId = reader.GetString(idx++);
                    model.BankAccountId = reader.GetInt32(idx++);
                    model.Value = reader.GetDecimal(idx++);
                    return model;                    
                }
            }
        }

        public object InsertTransaction(BankAccountTransactionModel model)
        {
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("Bankaccounttransactions_Insert", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@BankAccountId", model.BankAccountId);
                    cmd.Parameters.AddWithValue("@TransactionId", model.TransactionId);
                    cmd.Parameters.AddWithValue("@TransactionAmount", model.TransactionAmount);
                    cmd.Parameters.AddWithValue("@TransactionDate", model.TransactionDate);

                    cmd.ExecuteNonQuery();
                    return model;
                }
            }
        }

    }
}