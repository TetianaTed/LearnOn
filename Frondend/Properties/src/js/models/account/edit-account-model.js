class EditAcountModel {
  #oldPassword; //"test"
  #newPassword; //"test2"
  #repeatPassword; //"test2"
  #avatarUrl; //"https://www.shareicon.net/data/128x128/2015/12/14/207818_face_300x300.png"


  constructor(oldPassword, newPassword, repeatPassword, avatarUrl) {
    this.#oldPassword = oldPassword;
    this.#newPassword = newPassword;
	this.#repeatPassword = repeatPassword;
    this.#avatarUrl = avatarUrl;
  }
  
   static from(form) {
    return new EditAcountModel(form.oldPassword, form.newPassword, form.repeatPassword, form.avatarUrl);
  }
  
  get oldPassword() {
	  return this.#oldPassword;
  }
}