using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace Learnon_ui_integration.IntegrationTests.postman
{
    /*
    public class PostmanProcessIT : PostmanIntegrationConfiguration
    {
        private readonly ITestOutputHelper _testOutputHelper;
        private readonly int _applicationServerPort;

        public PostmanProcessIT(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
            _applicationServerPort = base.serverPort;
        }
        
        [Fact]
        public void TestPostmanCollection()
        {
            //Arrange (Specify the path to your Postman collection JSON file)
            string environmentPath = "example-environment.postman_environment.json";
            string collectionPath = "ExampleTests.postman_collection.json";
            
            //Act
            int exitedCode = RunPostmanCollectionTests(environmentPath, collectionPath).Result;

            //Assert
            string postManResultMessage = exitedCode == 0
                ? "Postman tests passed!"
                : "Postman tests failed.";
            
            _testOutputHelper.WriteLine(postManResultMessage);
            Assert.Equal(0, exitedCode);
        }

        private async Task<int> RunPostmanCollectionTests(string environmentPath, string collectionPath)
        {
            var projectDirectory = AppContext.BaseDirectory.Substring(0,
                AppContext.BaseDirectory.LastIndexOf("\\bin", StringComparison.Ordinal));
            
            string postmanPath = Path.Combine(projectDirectory, "Properties", "integration", "postman");
            string newmanPath = Path.Combine(postmanPath, "application", "newman.cmd");

            string json = $@"{{
                ""values"": [
                    {{
                        ""key"": ""baseUrl"",
                        ""value"": ""http://localhost:{_applicationServerPort}"",
                        ""enabled"": true
                    }}
                ],
                ""postman_variable_scope"": ""globals""
            }}";
            
            await File.WriteAllTextAsync("workspace.postman_globals.json", json);
            
            // Act
            string command =
                $@"{newmanPath} run -e {postmanPath}\data\{environmentPath} {postmanPath}\data\{collectionPath} -g workspace.postman_globals.json --disable-unicode --insecure";

            _testOutputHelper.WriteLine($"Command is: {command}");
            
            var procInfo = new ProcessStartInfo
            {
                FileName = "cmd.exe",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true,
                Arguments = $"/c {command}"
            };

            using (var process = new Process {StartInfo = procInfo})
            {
                StringBuilder logs = new StringBuilder();
                StringBuilder errors = new StringBuilder();

                process.OutputDataReceived += (sender, args) => logs.AppendLine(args.Data);
                process.ErrorDataReceived += (sender, args) => errors.AppendLine(args.Data);

                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();

                process.WaitForExit(40000);
                
                _testOutputHelper.WriteLine(logs.ToString());
                _testOutputHelper.WriteLine(errors.ToString());

                return process.ExitCode;
            }
        }
    }
    */
} 