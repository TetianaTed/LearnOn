using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using Learnon;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;
using Xunit.Abstractions;

namespace Learnon_ui_integration.IntegrationTests.code
{
    /*
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
                new CreateAccountRequest("testImie", "testNazwosko", "test@localhost.com", "Nieznana",
                    DateTime.Now, "test", "test"
                ),

                new CreateAccountRequest("testImie", "testNazwosko", "test2@localhost.com", "Nieznana",
                    DateTime.Now, "test", "test"
                )
            };

            //Act
            HttpResponseMessage[] responseMessages = new HttpResponseMessage[createAccountRequests.Length];
            for (int requestIndex = 0; requestIndex < createAccountRequests.Length; requestIndex++)
            {
                CreateAccountRequest request = createAccountRequests[requestIndex];
                responseMessages[requestIndex] =
                    await _client.PostAsync("http://localhost:80/api/accounts",
                        JsonContent.Create(request)); //http://localhost:80

                _testOutputHelper.WriteLine("JsonContent: " + JsonContent.Create(request).Value);
                _testOutputHelper.WriteLine("Response is: " + responseMessages[requestIndex].StatusCode);
            }

            //Assert
            foreach (var response in responseMessages)
            {
                Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            }
        }
    }
    */
}