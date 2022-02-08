export class User {
    _firstName: string;
    _lastName: string;
    _dateOfBirth: Date;
    _email: string;
    _age: number;
    _address: string;
    
    constructor(firstName: string, lastName: string, dateOfBirth: Date, email: string, age: number, address: string) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._dateOfBirth = dateOfBirth;
        this._email = email;
        this._age = age;
        this._address = address;
    }
}