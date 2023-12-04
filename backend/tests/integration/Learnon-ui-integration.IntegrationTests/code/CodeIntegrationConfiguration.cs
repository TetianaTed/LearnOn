using System;
using System.Linq;
using System.Net.Http;
using Learnon;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Xunit;
using Xunit.Abstractions;

namespace Learnon_ui_integration.IntegrationTests.code
{
    public abstract class CodeIntegrationConfiguration :  IClassFixture<CodeIntegrationConfiguration.TestWebApplicationFactory<Startup>>,
        IClassFixture<WebApplicationFactory<Startup>>,
        IDisposable
    {
        protected readonly HttpClient _client;

        protected readonly ITestOutputHelper _testOutputHelper;

        protected readonly LearnOnDbContext _dbContext;
        
        protected CodeIntegrationConfiguration(ITestOutputHelper testOutputHelper,
            WebApplicationFactory<Startup> factory,
            TestWebApplicationFactory<Startup> factory2)
        {
            _testOutputHelper = testOutputHelper;
            _client = factory2.CreateClient();
            _dbContext = factory2.Services.CreateScope().ServiceProvider.GetRequiredService<LearnOnDbContext>();
        }

        public void Dispose()
        {
            _dbContext.Database.EnsureDeleted();
        }

        public sealed class TestWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
        {
            protected override void ConfigureWebHost(IWebHostBuilder builder)
            {
                base.ConfigureWebHost(builder);
                builder.UseStartup<Startup>();
                builder.ConfigureTestServices(services =>
                {
                    // Replace the DbContext registration with a test DbContext using the in-memory database
                    ServiceDescriptor? descriptor =
                        services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<LearnOnDbContext>));
                    if (descriptor != null)
                    {
                        services.Remove(descriptor);
                    }

                    services.AddDbContext<LearnOnDbContext>(options =>
                    {
                        options.UseInMemoryDatabase("test database")
                            .UseLoggerFactory(LoggerFactory.Create(builder1 => builder1.AddConsole()));
                    });
                });
            }
        }
    }
}