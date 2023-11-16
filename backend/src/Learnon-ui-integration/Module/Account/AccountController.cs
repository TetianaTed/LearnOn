using Learnon_ui_integration.Module.Account.Logic;
using Learnon_ui_integration.Module.Account.Model.Expose;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnon_ui_integration.Module.Account
{
    
    [Route("api/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private ILogger<AccountController> _logger;
        private readonly IAccountApi _accountApi;
        public AccountController(ILogger<AccountController> logger, IAccountApi accountApi)
        {
            _logger = logger;
            _accountApi = accountApi;   
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateAccountRequest request) //[FromBody] - annotacja, atrybut od Web Api
        {
            _logger.LogInformation("Testowy logger");
            _accountApi.Create(request);
            return Created("", "abcd test");
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateAccountRequest request)
        {
            _accountApi.Update(request);
            return Ok("Success update");
        }


    }
    

}
