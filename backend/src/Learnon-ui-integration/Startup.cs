using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Npgsql; // Import Npgsql for PostgreSQL
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerUI;
using Microsoft.OpenApi.Models;
using Learnon_ui_integration.Module.Account.Logic;
//using Serilog;
//using Serilog.Formatting.Json; // Import OpenAPI v3 types


namespace Learnon
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
            
            /*Log.Logger = new LoggerConfiguration()
                .WriteTo.Console(new JsonFormatter()) // Log to the console in JSON format
                //.WriteTo.File(new JsonFormatter(), "logs/log.json", rollingInterval: RollingInterval.Day) // Log to a file in JSON format
                .CreateLogger();*/
        }

        public void ConfigureServices(IServiceCollection services)
        {
          //  services.AddLogging(loggingBuilder => loggingBuilder.AddSerilog());
            // Configure your PostgreSQL database connection
            services.AddDbContext<LearnOnDbContext>(options =>
            {
                options.UseNpgsql(_configuration.GetConnectionString("PostgreSQLConnection"));
            });

            
            // Register the Swagger generator with OpenAPI v3
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "LearnOn API",
                    Version = "v1"
                });
            });
            
            services.AddControllers();
            
           AccountConfiguration accountConfiguration = new AccountConfiguration();
           accountConfiguration.Configure(services);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();
            app.UseRouting();
         //   app.UseSerilogRequestLogging();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            //app.UseHttpsRedirection();
            
            // Enable middleware to serve generated Swagger as JSON endpoint
            app.UseSwagger();
            
            // Enable middleware to serve Swagger UI, specifying the Swagger JSON endpoint
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "LearnOn API V1");
            });
        }
    }
}