class ViewAccountModel {
  #firstName; //"test"
  #lastName; //"test"
  #email; //"jan.nowak@gmail.com"
  #birthDate; //"2022-11-16T23:00:00.000Z"
  #gender; //"Mężczyzna"
  #avatarUrl; //"https://www.shareicon.net/data/128x128/2015/12/14/207818_face_300x300.png"
 
  
  constructor(firstName, lastName, email, birthDate, gender, avatarUrl) {
    this.#firstName = firstName;
    this.#lastName = lastName;
	this.#email = email;
    this.#birthDate = birthDate;
	this.#gender = gender;
	this.#avatarUrl = avatarUrl;
  }
  
   static from(form) {
    return new CreateAcountModel(form.firstName, form.lastName, form.email, form.birthDate, form.gender, form.avatarUrl);
  }
  
  get firstName() {
	  return this.#firstName;
  }
}