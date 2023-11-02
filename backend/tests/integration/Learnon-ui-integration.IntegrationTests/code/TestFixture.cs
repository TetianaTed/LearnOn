/*using System;
using Microsoft.EntityFrameworkCore;

namespace Learnon_ui_integration.IntegrationTests.code
{
    public class TestFixture : IDisposable
    {
        public TestDbContext DbContext { get; }

        public TestFixture()
        {
            var options = new DbContextOptionsBuilder<TestDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            DbContext = new TestDbContext(options);
        }

        public void Dispose()
        {
            DbContext.Dispose();
        }
    }
}*/