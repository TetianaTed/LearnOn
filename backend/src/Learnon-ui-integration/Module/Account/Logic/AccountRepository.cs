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

        public AccountEntity? FindById(long id)
        {
            return _context.Accounts.FirstOrDefault(account => account.Id == id);
        }

        public void Update(AccountEntity entity)
        {
            /*
              if (entity.BirthDate.HasValue)
            {
                entity.BirthDate = DateTime.Parse(entity.BirthDate.Value.ToLongDateString());
            }    
            */
            _context.Accounts.Update(entity);
            _context.SaveChanges();
        }

        public void Delete(AccountEntity foundAccount)
        {
           _context.Accounts.Remove(foundAccount);
           _context.SaveChanges();
        }

        public AccountEntity? FindByEmail(string email)
        {
            return _context.Accounts.FirstOrDefault(account => account.Email.Equals(email));
        }
    }
}
