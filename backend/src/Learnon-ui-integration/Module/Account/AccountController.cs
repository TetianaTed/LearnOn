using Learnon_ui_integration.Module.Account.Logic;
using Learnon_ui_integration.Module.Account.Model.Expose;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnon_ui_integration.Module.Account
{
    //[EnableCors("*")]
    //[DisableCors]
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
            
            try
            {
                _accountApi.Create(request);
            }
            catch (Exception ex)
            {

                return base.StatusCode(500, ex.Message);
            }
            return Created("", "abcd test");
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] UpdateAccountRequest request)
        {
            _accountApi.Update(request);
            return Ok("Success update");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            _accountApi.Delete(id);
            return Ok("Success delete");
        }

        [HttpGet("{id}")]
        public IActionResult FindById(long id)
        {
            IList<AccountResponse> response = _accountApi.FindById(id);
            if (response.Count == 0)
            {
                return NoContent();
            }
            return Ok(response);
        }

        [HttpGet()]
        public IActionResult FindByEmail([FromQuery]string email)
        {
            IList<AccountResponse> response = _accountApi.FindByEmail(email);
            if (response.Count == 0)
            {
                return NoContent();
            }
            return Ok(response);
        }


    }
    

}
