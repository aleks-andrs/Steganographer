import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  //validate a user object for register component
  validateRegister(user){
    if(user.name == undefined || user.username == undefined || user.password == undefined || user.name == "" || user.username == "" || user.password == ""){
      return false;
    } else{
      return true;
    }
  }

  //validate a user object for login component
  validateLogin(user){
    if(user.username == undefined || user.password == undefined || user.username == "" || user.password == ""){
      return false;
    } else{
      return true;
    }
  }

  //validate register input is alphanumeric
  validateAlphaNumericRegister(user){
    var acceptableInput = /^[0-9a-zA-Z]+$/;
    var extendedAcceptableInput = /^[0-9a-zA-Z]+( [0-9a-zA-Z]+)*$/;
    if(user.name.match(extendedAcceptableInput) && user.username.match(acceptableInput) && user.password.match(acceptableInput)){
      return true;
    } else{
      return false;
    }
  }

  //validate login input is alphanumeric
  validateAlphaNumericLogin(user){
    var acceptableInput = /^[0-9a-zA-Z]+$/;
    if(user.username.match(acceptableInput) && user.password.match(acceptableInput)){
      return true;
    } else{
      return false;
    }
  }

  //validate any field for present text
  validateEntry(givenString){
    if(givenString == undefined || givenString.length < 1){
      return false;
    } else{
      return true;
    }
  }

  //validate any field for length(min 4, max 12)
  validateEntryLength(givenString){
    if(givenString.length < 4 || givenString.length > 12){
      return false;
    } else{
      return true;
    }
  }
}
