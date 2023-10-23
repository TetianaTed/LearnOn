class LoginAcountModel { //http://localhost:5000/api/authenticate
  #email; //"jan.nowak@gmail.com"
  #password; //"admin"

  constructor(email, password) {
    this.#email = email;
    this.#password = password;
  }
  
   static from(form) {
    return new LoginAcountModel(form.email, form.password);
  }
  
  get email() {
	  return this.#email;
  }
}