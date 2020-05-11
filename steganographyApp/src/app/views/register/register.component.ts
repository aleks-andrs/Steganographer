import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { ValidateService } from './../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  password: String;
  info: String;

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegister() {
    const user = {
      name: this.name,
      username: this.username,
      password: this.password,
      info: []
    }

    //validate that all fields are entered
    if(!this.validateService.validateRegister(user)){
      this.flashMessages.show("Please fill in all fields", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    //validate that password is the right length
    if(!this.validateService.validateEntryLength(this.password)){
      this.flashMessages.show("Password must be 4 to 12 symbols long", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    //restrict special symbols
    if(!this.validateService.validateSpecialSymbols(this.name)){
      this.flashMessages.show("< > tags are not allowed", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    //restrict special symbols
    if(!this.validateService.validateSpecialSymbols(this.password)){
      this.flashMessages.show("< > tags are not allowed", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    //restrict special symbols
    if(!this.validateService.validateSpecialSymbols(this.username)){
      this.flashMessages.show("< > tags are not allowed", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }


    //register user
    this.apiService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessages.show("New user registered", {cssClass: 'alert-success', timeout:3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout:3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
