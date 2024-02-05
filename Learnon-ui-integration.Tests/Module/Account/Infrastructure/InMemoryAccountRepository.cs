using Learnon_ui_integration.Module.Account.Logic;
using Learnon_ui_integration.Module.Account.Model.Database.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnon_ui_integration.Tests.Module.Account.Infrastructure
{
    internal class InMemoryAccountRepository : IAccountRepository
    {
        private readonly IDictionary<long , AccountEntity> _database = new Dictionary<long , AccountEntity>();   

        public void Create(AccountEntity entity)
        {
            if (entity.Id == 0)
            {
                entity.Id = _database.Any()
                    ? _database.Max(account => account.Key) + 1
                    : 1;
            }
            _database.Add(entity.Id, entity);   
        }

        public void Delete(AccountEntity foundAccount)
        {
            throw new NotImplementedException();
        }

        public AccountEntity? FindByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public AccountEntity? FindById(long id)
        {
            throw new NotImplementedException();
        }

        public void Update(AccountEntity foundAccount)
        {
            throw new NotImplementedException();
        }
    }
}
