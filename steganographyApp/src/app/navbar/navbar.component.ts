import { Component, OnInit } from '@angular/core';
import { ValidateService } from './../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from './../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    public apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
    this.apiService.logoutUser();
    this.flashMessages.show("You are logged out",{cssClass: 'alert-success', timeout:3000});
    this.router.navigate(['/login']);
    return false;
  }

}
