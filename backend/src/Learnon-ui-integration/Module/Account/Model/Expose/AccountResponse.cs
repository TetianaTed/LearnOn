using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Learnon_ui_integration.Module.Account.Model.Expose
{
    public class AccountResponse
    {
        public long Id { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public DateTime? BirthDate { get; set; } 

        public string Gender { get; set; }

        public AccountResponse(long id,
                               string firstName,
                               string lastName,
                               string email,
                               string password,
                               DateTime? birthdate,
                               string gender)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            BirthDate = birthdate;
            Gender = gender;
        }

        public AccountResponse()
        {
        }
    }
}
