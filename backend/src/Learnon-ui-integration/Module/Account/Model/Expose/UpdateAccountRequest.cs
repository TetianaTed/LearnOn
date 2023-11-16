using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Learnon_ui_integration.Module.Account.Model.Expose
{
    public class UpdateAccountRequest
    {
        [Required]
        public long Id { get; } 

        [Required]
        [MaxLength(150)]
        public string OldPassword { get; }

        [Required]
        [MaxLength(150)]
        public string NewPassword { get; }

        [Required]
        [MaxLength(150)]
        public string RepeatNewPassword { get; }
      
        public UpdateAccountRequest(
                                    long id,
                                    string oldPassword,
                                    string newPassword,
                                    string repeatNewPassword)
        {
            Id = id;
            OldPassword = oldPassword;
            NewPassword = newPassword;
            RepeatNewPassword = repeatNewPassword;  
        }

    }
}
