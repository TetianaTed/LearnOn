using System.Runtime.CompilerServices;

namespace Learnon_ui_integration.Module.Account.Logic
{
    public class AccountConfiguration
    {
        public void Configure(IServiceCollection services)
        {
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IAccountApi, AccountFacade>();
        }
    }
}