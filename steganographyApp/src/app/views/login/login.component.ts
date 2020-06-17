import { Component, OnInit } from '@angular/core';
import { ValidateService } from './../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    const user = {
      username: this.username,
      password: this.password
    }

    //validate that all fields are entered
    if(!this.validateService.validateLogin(user)){
      this.flashMessages.show("Please fill in all fields", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    //validate alphanumeric input
    if(!this.validateService.validateAlphaNumericLogin(user)){
      this.flashMessages.show("Special symbols or empty spaces are not permitted", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    //validate that password is the right length
    if(!this.validateService.validateEntryLength(this.password)){
      this.flashMessages.show("Password must be 4 to 12 symbols long", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    //Authenticate user
    this.apiService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.apiService.storeUserData(data.token, data.user);
        this.router.navigate(['/home']);
      } else {
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout:3000});
        this.router.navigate(['/login']);
      }
    });
  }
}
