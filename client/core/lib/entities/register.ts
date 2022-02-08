export class Register {
  _firstName: string;
  _lastName: string;
  _dateOfBirth: Date;
  _email: string;
  _age: number;
  _address: string;
  _username: string;
  _password: string;

  constructor(
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    email: string,
    age: number,
    address: string,
    username: string,
    pasword: string
  ) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._dateOfBirth = dateOfBirth;
    this._email = email;
    this._age = age;
    this._address = address;
    this._username = username;
    this._password = pasword
  }
}
