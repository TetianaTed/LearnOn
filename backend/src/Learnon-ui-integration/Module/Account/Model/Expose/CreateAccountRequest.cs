using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace Learnon_ui_integration.Module.Account.Model.Expose
{
    public class CreateAccountRequest
    {
        [Required]
        [MaxLength(150)]       
        [JsonProperty("firstName")]
        public string FirstName { get; }

        [Required]
        [MaxLength(150)]
        public string LastName { get; }

        [Required]
        [EmailAddress]
        public string Email { get; }

        [Required]
        [MaxLength(150)]
        public string Password { get; }

        [Required]
        [MaxLength(150)]
        public string RepeatPassword { get; }
        public DateTime? BirthDate { get; } //? na koncu typu znaczy opcjonal

        [Required]
        [MaxLength(150)]
        public string Gender { get; }

        public CreateAccountRequest(string firstName, 
                                    string lastName, 
                                    string email, 
                                    string password, 
                                    string repeatPassword,
                                    DateTime? birthdate,
                                    string gender)                                    
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            RepeatPassword = repeatPassword;
            BirthDate = birthdate;
            Gender = gender;
        }

        /*
{       
  "firstName": "testImie",
  "lastName": "testNazwisko",
  "email": "testiiii12346667891260@wp.pl",
  "password": "test",
  "repeatPassword": "test",
  "birthDate": "2023-09-20T22:00:00.000Z",
  "gender": "Nieznana"        
}
        */
    }
}
