import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordmanager',
  templateUrl: './passwordmanager.component.html',
  styleUrls: ['./passwordmanager.component.css']
})
export class PasswordmanagerComponent implements OnInit {
  user: any;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.getSavedPasswords().subscribe( res => {
      let data = {} as any;
      data = res
      this.user = data.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
