using PersonalProject.interfaces;
using PersonalProject.Models;
using PersonalProject.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace PersonalProject.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("project/webscrape")]
    public class DanielController : ApiController
    {
        private IDanielService danielService;

        public DanielController(IDanielService _danielService)
        {
            danielService = _danielService;
        }

        [HttpGet]
        [Route("Trailer")]
        public HttpResponseMessage GetTrailer(URLmodel model)
        {
            object url = danielService.ScrapeTrailer(model);
            return Request.CreateResponse(HttpStatusCode.OK, url);
        }

        [HttpGet]
        [Route("Web")]
        public HttpResponseMessage GetTWeb(URLmodel model)
        {
            object url = danielService.ScrapeWeb(model);
            return Request.CreateResponse(HttpStatusCode.OK, url);
        }

        [HttpGet]
        [Route("Tickets")]
        public HttpResponseMessage GetTickets(URLmodel model)
        {
            object url = danielService.ScrapeTickets(model);
            return Request.CreateResponse(HttpStatusCode.OK, url);
        }
        [HttpGet]
        [Route("{id:int}")]
        public HttpResponseMessage GetById(int id)
        {
            try
            {
                ItemResponse<UsersModel> resp = new ItemResponse<UsersModel>();
                resp.Item = danielService.GetById(id);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public HttpResponseMessage Update(UsersModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    danielService.Update(model);
                    SuccessResponse resp = new SuccessResponse();
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        [Route]
        public HttpResponseMessage Create(UsersAddRequest model)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    int id = danielService.Create(model);
                    ItemResponse<int> resp = new ItemResponse<int>();
                    resp.Item = id;

                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        [Route("delete")]
        public HttpResponseMessage DeleteUserJoin(string AspId,int id)
        {
            try
            {
                danielService.DeleteUserJoin(AspId, id);
                SuccessResponse resp = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        [Route("createuserjoin")]
        public HttpResponseMessage CreateJoin(AspJoinModel model)
        {
            if(ModelState.IsValid)
            {
                danielService.CreateJoin(model);
                ItemResponse<object> resp = new ItemResponse<object>();
                resp.Item = model;

                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpGet]
        [Route("aspid")]
        public HttpResponseMessage GetByAspId(string Email)
        {
            try
            {
                ItemResponse<AspEmail> resp = new ItemResponse<AspEmail>();
                resp.Item = danielService.GetByAspId(Email);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        [HttpGet]
        [Route("user")]
        public HttpResponseMessage GetSelectByAspId(string AspId)
        {
            try
            {
                ItemResponse<AspIdModel> resp = new ItemResponse<AspIdModel>();
                resp.Item = danielService.SelectByAspId(AspId);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        
    }
}