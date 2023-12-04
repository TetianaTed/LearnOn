using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using Learnon;
using Learnon_ui_integration.Module.Account.Model.Database.Entity;
using Learnon_ui_integration.Module.Account.Model.Expose;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;
using Xunit.Abstractions;
using Xunit.Sdk;

namespace Learnon_ui_integration.IntegrationTests.code
{

    public class TestAsCodeIT : CodeIntegrationConfiguration
    {
        public TestAsCodeIT(ITestOutputHelper testOutputHelper, WebApplicationFactory<Startup> factory,
            TestWebApplicationFactory<Startup> factory2) : base(testOutputHelper, factory, factory2)
        {
        }

        [Fact]
        public async void RunTestsAsCode()
        {
            //Arrange
            CreateAccountRequest[] createAccountRequests = new CreateAccountRequest[]
            {
                new CreateAccountRequest("testImie",
                                         "testNazwisko",
                                         "test@localhost.com",
                                         "test",
                                         "test",
                                         DateTime.Now,
                                         "Nieznana"),

                new CreateAccountRequest("testImie",
                                         "testNazwisko",
                                         "test2@localhost.com",
                                         "test",
                                         "test",
                                         DateTime.Now,
                                         "Nieznana")
            };

            //Act
            HttpResponseMessage[] responseMessages = new HttpResponseMessage[createAccountRequests.Length];
            for (int requestIndex = 0; requestIndex < createAccountRequests.Length; requestIndex++)
            {
                CreateAccountRequest request = createAccountRequests[requestIndex];
                responseMessages[requestIndex] =
                    await _client.PostAsync("http://localhost:80/api/accounts",
                        JsonContent.Create(request));

                _testOutputHelper.WriteLine("JsonContent: " + JsonContent.Create(request).Value);
                _testOutputHelper.WriteLine("Response is: " + responseMessages[requestIndex].StatusCode);
            }

            //Assert
            foreach (var response in responseMessages)
            {
                Assert.Equal(2,base._dbContext.Accounts.Count());
                Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            }

           IList<AccountEntity> foundAllAccounts = _dbContext.Accounts.ToList();
            foreach (var accountEntity in foundAllAccounts)
            {
                _testOutputHelper.WriteLine(accountEntity.ToString());
            }

        }

        [Fact]
        public async void Success_Account_Update()
        {
            Assert.Equal(0, _dbContext.Accounts.Count());
            //Arrange
            AccountEntity arrangeCreateAccountRequest =
                        new AccountEntity() {
                            FirstName = "testImie",
                            LastName = "testNazwisko",
                            Email = "test@localhost.com",
                            Password = "test",
                            BirthDate = DateTime.Now,
                            Gender = "Nieznana"
                          };
            //Save the data to database
            _dbContext.Accounts.Add(arrangeCreateAccountRequest);
            _dbContext.SaveChanges();

            Assert.Equal(1, _dbContext.Accounts.Count());

            //fetch created account id
            AccountEntity foundedAccount = _dbContext.Accounts.First(account => 
                                            account.Email.Equals(arrangeCreateAccountRequest.Email));

            //And (prepare update account request)
            UpdateAccountRequest arrangeUpdateAccountRequest = new UpdateAccountRequest(foundedAccount.Id, "test","test1","test1");

            //Act
            HttpResponseMessage operationUpdateResult = await _client.PutAsync($"http://localhost:80/api/accounts/{arrangeUpdateAccountRequest.Id}",
                                                                              JsonContent.Create(arrangeUpdateAccountRequest));
            //_dbContext.SaveChanges();
            //_testOutputHelper.WriteLine(await operationUpdateResult.Content.ReadAsStringAsync());

            IList<AccountEntity> foundAllAccounts = _dbContext.Accounts.ToList();
            foreach (var accountEntity in foundAllAccounts)
            {
                _testOutputHelper.WriteLine(accountEntity.ToString());
            }


            //Assert
            Assert.Equal(HttpStatusCode.OK, operationUpdateResult.StatusCode);            
            Assert.Equal(arrangeUpdateAccountRequest.NewPassword, 
                        _dbContext.Accounts.First(x => x.Id== arrangeUpdateAccountRequest.Id).Password);

        }
    }

}