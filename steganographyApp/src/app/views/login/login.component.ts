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

    //Authenticate user
    this.apiService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.apiService.storeUserData(data.token, data.user);
        this.flashMessages.show("You are now logged in", {cssClass: 'alert-success', timeout:9000});
        this.router.navigate(['login']);
      } else {
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout:9000});
        this.router.navigate(['login']);
      }
    });
  }
}
