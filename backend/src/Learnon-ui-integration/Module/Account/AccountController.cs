using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnon_ui_integration.Module.Account
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private ILogger<AccountController> _logger;

        public AccountController(ILogger<AccountController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Create()
        {
            _logger.LogInformation("Testowy logger");
            return Created("", null);
        }


    }

}
