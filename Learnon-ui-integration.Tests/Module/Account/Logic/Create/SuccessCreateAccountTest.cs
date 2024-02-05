using Learnon_ui_integration.Module.Account.Logic;
using Learnon_ui_integration.Module.Account.Model.Database.Entity;
using Learnon_ui_integration.Tests.Module.Account.Infrastructure;
using Microsoft.Extensions.Logging;
using System;

public class SuccessCreateAccountTest
{
	public SuccessCreateAccountTest()
	{
        // Arrange
        IAccountRepository repository = new InMemoryAccountRepository();
		ILogger<IAccountApi> logger = null;

        IAccountApi accountApi = AccountConfiguration.Create(repository, logger);
        var accountEntity = new AccountEntity();

        // Act
        //accountRepositoryMock.Object.Create(accountEntity);

        // Assert
        //accountRepositoryMock.Verify(x => x.Create(accountEntity), Times.Once);

    }
}
