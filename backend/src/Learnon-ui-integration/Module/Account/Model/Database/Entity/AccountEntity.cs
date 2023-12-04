using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learnon_ui_integration.Module.Account.Model.Database.Entity
{
    [Table(name: "account")]
    public class AccountEntity
    {
        [Column("id")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column("first_name")]
        [Required]
        [MaxLength(150)]
        public string FirstName { get; set; }

        [Column("last_name")]
        [Required]
        [MaxLength(150)]
        public string LastName { get; set; }

        [Column("email")]
        [Required]
        public string Email { get; set; }

        [Column("password")]
        [Required]
        [MaxLength(150)]
        public string Password { get; set; }

        [Column("birth_date")]
        public DateTime? BirthDate { get; set; } //? na koncu typu znaczy opcjonal

        [Column("gender")]
        [Required]
        [MaxLength(150)]
        public string Gender { get; set; }

        [Column("avatar_url")]        
        public string? AvatarUrl { get; set; }

        public override string ToString()
        {
            return $"AccountEntity - FirstName: {FirstName}, LastName: {LastName}, Email: {Email}, Gender: {Gender}, BirthDate: {BirthDate}, Password: {Password}";
        }

        /*
        public AccountEntity(string firstName,
                             string lastName,
                             string email,
                             string password,
                             DateTime? birthdate,
                             string gender,
                             string? avatarUrl)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            BirthDate = birthdate;
            Gender = gender;
            AvatarUrl = avatarUrl;
        }
        */
    }
}
