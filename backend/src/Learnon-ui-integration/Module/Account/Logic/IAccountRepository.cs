using Learnon_ui_integration.Module.Account.Model.Database.Entity;

namespace Learnon_ui_integration.Module.Account.Logic
{
    public interface IAccountRepository
    {
        void Create(AccountEntity entity);
    }
}
