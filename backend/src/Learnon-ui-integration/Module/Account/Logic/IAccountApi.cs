using Learnon_ui_integration.Module.Account.Model.Expose;

namespace Learnon_ui_integration.Module.Account.Logic
{
    public interface IAccountApi
    {
        void Create(CreateAccountRequest request);
        void Update(UpdateAccountRequest request);
    }
}
