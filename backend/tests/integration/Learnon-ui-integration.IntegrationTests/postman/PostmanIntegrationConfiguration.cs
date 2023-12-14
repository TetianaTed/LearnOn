using System;
using System.Linq;
using System.Net;
using System.Reflection;
using Learnon;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Learnon_ui_integration.IntegrationTests.postman
{
    public abstract class PostmanIntegrationConfiguration : IDisposable
    {
        //private static bool isDebugMode = System.Diagnostics.Debugger.IsAttached;

        protected readonly int serverPort = 5000;

        private readonly IHost _host;

        protected PostmanIntegrationConfiguration()
        {
            _host = ConfigureServer();
            _host.RunAsync();
        }

        private IHost ConfigureServer()
        {
            return Host.CreateDefaultBuilder()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>(); // Use the Startup class to configure the Web API.
                    webBuilder.ConfigureKestrel(options =>
                    {
                        options.Listen(IPAddress.Any, serverPort,
                            listenOptions => { listenOptions.UseConnectionLogging(); });
                    });
                    webBuilder.ConfigureTestServices(services =>
                    {
                        // Replace the DbContext registration with a test DbContext using the in-memory database
                        ServiceDescriptor? descriptor = services.SingleOrDefault(iterateDescriptor =>
                            iterateDescriptor.ServiceType == typeof(DbContextOptions<LearnOnDbContext>));

                        if (descriptor != null)
                        {
                            services.Remove(descriptor);
                        }

                        services.AddDbContext<LearnOnDbContext>(options =>
                        {
                            options.UseInMemoryDatabase("test base")
                                .UseLoggerFactory(LoggerFactory.Create(builder3 => builder3.AddConsole()));
                        });

                        //services.AddScoped<AccountHelperTestController>();
                        //services.AddRouting();
                        services.AddMvc().AddApplicationPart(Assembly.Load(new AssemblyName("Learnon-ui-integration.IntegrationTests")));
                    });
                })
                .Build();
        }

        public void Dispose()
        {
            _host.Dispose();
        }
    }
}