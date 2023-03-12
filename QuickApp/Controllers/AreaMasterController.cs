using AutoMapper;
using DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Helpers;
using QuickApp.ViewModels;
using System.Collections.Generic;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    public class AreaMasterController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly IEmailSender _emailSender;

        public AreaMasterController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<CustomerController> logger, IEmailSender emailSender)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailSender = emailSender;
        }

        // GET: api/values
        [HttpGet("{user}")]
        public IActionResult Get(int user)
        {
            var allAreaMasters = _unitOfWork.AreaMaster.Find(x=>x.UserId== user);
            return Ok(_mapper.Map<IEnumerable<AreaMasterViewModel>>(allAreaMasters));
        }

        // GET api/values/5
        [HttpGet("{user}/{id}")]
        public string Get(int user,int id)
        {
            return "value: " + user  + id;
        }
    }
}
