using AutoMapper;
using DAL;
using DAL.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Helpers;
using QuickApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    public class AreaMasterController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly IEmailSender _emailSender;
        private readonly IAuthorizationService _authorizationService;
        private readonly IAccountManager _accountManager;
        private const string GetAreasActionName = "GetAreasByUserId";

        public AreaMasterController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<CustomerController> logger, IEmailSender emailSender, 
            IAuthorizationService authorizationService)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailSender = emailSender;
            _authorizationService = authorizationService;
        }

        // GET: api/values
        [HttpGet]
        [Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult Get()
        {
            try
            {
                int userId = _unitOfWork.CurrentUser != null ? _unitOfWork.CurrentUser.UserId : -1;
                var allAreaMasters = _unitOfWork.AreaMaster.Find(x => x.UserId == userId);
                return Ok(_mapper.Map<IEnumerable<AreaMasterViewModel>>(allAreaMasters));
            }
            catch(Exception ex)
            {
                string st = ex.Message;
                return BadRequest(ModelState);
            }

        }

        // GET api/values/5
        [HttpPost()]
        [ProducesResponseType(201, Type = typeof(AreaMasterViewModel))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> UpdateArea([FromBody]  AreaMasterViewModel areaObj)
        {
            var user = _unitOfWork.CurrentUser;
            //if (!(await _authorizationService.AuthorizeAsync(this.User, (user.Rol, new string[] { }), Authorization.Policies.AssignAllowedRolesPolicy)).Succeeded)
            //    return new ChallengeResult();

            var area = _unitOfWork.AreaMaster.Get(areaObj.Id);
            if (area == null)
            {
                area = new DAL.Models.AreaMaster();
                _unitOfWork.AreaMaster.Add(area);
            }
            area.AreaCode = areaObj.AreaCode;
            area.AreaDesc = areaObj.AreaDesc;

            if (_unitOfWork.SaveChanges() == 1)
            {
                return CreatedAtAction(GetAreasActionName, new { Id = area.Id, areaObj.AreaCode, areaObj.AreaDesc });
            }
            return BadRequest(ModelState);

        }
    }
}
