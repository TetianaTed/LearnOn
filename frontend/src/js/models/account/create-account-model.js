class CreateAcountModel {
  #firstName; //"test"
  #lastName; //"test"
  #email; //"jan.nowak@gmail.com"
  #password; //"test"
  #repeatPassword; //"test"
  #birthDate; //"2022-11-16T23:00:00.000Z"
  #gender; //"Mężczyzna"
 
  
  constructor(firstName, lastName, email, password, repeatPassword, birthDate, gender) {
    this.#firstName = firstName;
    this.#lastName = lastName;
	this.#email = email;
    this.#password = password;
	this.#repeatPassword = repeatPassword;
    this.#birthDate = birthDate;
	this.#gender = gender;
  }
  
   static from(form) {
    return new CreateAcountModel(form.firstName, form.lastName, form.email, form.password, form.repeatPassword, form.birthDate, form.gender);
  }
  
  get firstName() {
	  return this.#firstName;
  }
}