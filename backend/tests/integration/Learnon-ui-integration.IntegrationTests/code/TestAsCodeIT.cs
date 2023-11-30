using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using Learnon;
using Learnon_ui_integration.Module.Account.Model.Expose;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;
using Xunit.Abstractions;

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
                Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            }
        }

        [Fact]
        public async void Success_Account_Update()
        {
            //Arrange
            CreateAccountRequest arrangeCreateAccountRequest =
                        new CreateAccountRequest("testImie",
                                                 "testNazwisko",
                                                 "test@localhost.com",
                                                 "test",
                                                 "test",
                                                 DateTime.Now,
                                                "Nieznana");
            //Save the data to database
            HttpResponseMessage responseMessage = await _client.PostAsync("http://localhost:80/api/accounts", 
                                                                            JsonContent.Create(arrangeCreateAccountRequest));
            Assert.Equal(HttpStatusCode.Created, responseMessage.StatusCode);

            //And (retrieve account id)

            HttpResponseMessage responseFoundAccount = await _client
                .GetAsync($"http://localhost:80/api/accounts?email={arrangeCreateAccountRequest.Email}");
           
            AccountResponse arrangeFoundAccount = await responseFoundAccount.Content.ReadAsAsync<AccountResponse>();

            //And (prepare update account request)
            UpdateAccountRequest arrangeUpdateAccountRequest = new UpdateAccountRequest(arrangeFoundAccount.Id,"test","test1","test1");

            //Act
            HttpResponseMessage operationUpdateResult = await _client.PutAsync($"http://localhost:80/api/accounts/{arrangeUpdateAccountRequest.Id}",
                                                                              JsonContent.Create(arrangeUpdateAccountRequest));

            //Assert
            Assert.Equal(HttpStatusCode.OK, operationUpdateResult.StatusCode);
        }
    }

}