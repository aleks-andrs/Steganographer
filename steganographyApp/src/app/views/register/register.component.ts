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
      info: "[]"
    }

    //Validate that fields are entered
    if(!this.validateService.validateRegister(user)){
      this.flashMessages.show('Fill in all fields', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    //Register user
    this.apiService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessages.show('User registered', {cssClass: 'alert-success', timeout:3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessages.show('User not registered', {cssClass: 'alert-danger', timeout:3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
