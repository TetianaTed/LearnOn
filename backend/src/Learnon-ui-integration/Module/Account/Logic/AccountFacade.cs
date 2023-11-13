using Learnon_ui_integration.Module.Account.Model.Database.Entity;
using Learnon_ui_integration.Module.Account.Model.Expose;

namespace Learnon_ui_integration.Module.Account.Logic
{
    internal class AccountFacade : IAccountApi
    {
        private readonly ILogger<AccountFacade> _logger;
		private readonly IAccountRepository _accountRepository;	
        public AccountFacade(ILogger<AccountFacade> logger, IAccountRepository accountRepository)
		{
			_logger = logger;
			_accountRepository = accountRepository;
		}
		public void Create(CreateAccountRequest request)
        {
			try
			{
				_logger.LogInformation("Request is: " + request);

				if (!request.Password.Equals(request.RepeatPassword))
				{
					throw new ArgumentException("Password_not_match;");
				}

				AccountEntity account = new AccountEntity
				{
					FirstName = request.FirstName,
					LastName = request.LastName,
					Email = request.Email,
					Password = request.Password,
					BirthDate = request.BirthDate,
					Gender = request.Gender,
					AvatarUrl = null
				};
				_accountRepository.Create(account);				
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error when created account");
				throw;
			}			
        }
    }
}
