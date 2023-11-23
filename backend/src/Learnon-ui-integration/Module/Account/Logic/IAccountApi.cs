using Learnon_ui_integration.Module.Account.Model.Expose;

namespace Learnon_ui_integration.Module.Account.Logic
{
    public interface IAccountApi
    {
        void Create(CreateAccountRequest request);
        void Delete(long id);
        IList<AccountResponse> FindByEmail(string email);
        IList<AccountResponse> FindById(long id);
        void Update(UpdateAccountRequest request);
    }
}
