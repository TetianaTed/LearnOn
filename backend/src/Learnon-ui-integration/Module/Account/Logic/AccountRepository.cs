using Learnon;
using Learnon_ui_integration.Module.Account.Model.Database.Entity;

namespace Learnon_ui_integration.Module.Account.Logic
{
    public class AccountRepository : IAccountRepository
    {
        private readonly LearnOnDbContext _context;

        public AccountRepository(LearnOnDbContext context)
        {
            _context = context;
        }
        public void Create(AccountEntity entity)
        {
            if (entity.Id == 0)
            {
                entity.Id = _context.Accounts.Any()
                    ? _context.Accounts.Max(account => account.Id) + 1
                    : 1;
            }
            _context.Accounts.Add(entity);
            _context.SaveChanges();

        }
    }
}
