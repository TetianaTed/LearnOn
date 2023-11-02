using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Learnon
{
    public static class Program
    {

        // Main Method 
        public static void Main(String[] args)
        {
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>(); // Use the Startup class to configure the Web API.
                })
                .Build()
                .Run();
        }
    }
}
