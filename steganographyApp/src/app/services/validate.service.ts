import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  //Validate a user object
  validateRegister(user){
    if(user.name == undefined || user.username == undefined || user.password == undefined){
      return false;
    } else{
      return true;
    }
  }

  //Validate any field for p`resent text
  validateEntry(givenString){
    if(givenString == undefined || givenString.length < 1){
      return false;
    } else{
      return true;
    }
  }

  //Validate any field for length(min 4, max 12)
  validateEntryLength(givenString){
    if(givenString.length < 4 || givenString.length > 12){
      return false;
    } else{
      return true;
    }
  }
}
