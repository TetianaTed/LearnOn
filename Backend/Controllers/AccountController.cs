using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/accounts")]
    public class AccountController: ControllerBase 
    {
        private readonly ILogger<AccountController> _logger;
        public AccountController(ILogger<AccountController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Test()
        {
            _logger.LogInformation("Hello Tetiana");
            return "Hello";
        }
    }
}
