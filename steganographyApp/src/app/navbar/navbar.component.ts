import { Component, OnInit } from '@angular/core';
import { ValidateService } from './../services/validate.service';
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
    public apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
    this.apiService.logoutUser();
    this.router.navigate(['/login']);
    return false;
  }

}
