using Learnon;
using Learnon_ui_integration.Module.Account.Model.Database.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnon_ui_integration.IntegrationTests.postman
{
    [Route("api/accounts/test")]
    [ApiController]
    public class AccountHelperTestController : ControllerBase
    {
        private ILogger<AccountHelperTestController> _logger;
        private readonly LearnOnDbContext _context;

        public AccountHelperTestController(ILogger<AccountHelperTestController> _logger, LearnOnDbContext _context)
        {
            this._logger = _logger;
            this._context = _context;
        }

        [HttpDelete("clear-database")]       
        public IActionResult ClearDatabase()
        {
            IList<AccountEntity> allAccounts = _context.Accounts.ToList();
            _context.Accounts.RemoveRange(allAccounts);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("add")]
        public IActionResult CreateAccount([FromBody] AccountEntity account)
        {
            _context.Accounts.Add(account);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("all")]
        public IActionResult AllAccounts()
        {
            IList<AccountEntity> allAccounts = _context.Accounts.ToList();
            return Ok(allAccounts);
        }
    }


}
