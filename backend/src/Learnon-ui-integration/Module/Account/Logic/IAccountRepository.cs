using Learnon_ui_integration.Module.Account.Model.Database.Entity;

namespace Learnon_ui_integration.Module.Account.Logic
{
    public interface IAccountRepository
    {
        void Create(AccountEntity entity);
        void Delete(AccountEntity foundAccount);
        AccountEntity? FindByEmail(string email);
        AccountEntity? FindById(long id);
        void Update(AccountEntity foundAccount);
    }
}
