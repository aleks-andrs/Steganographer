import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-passwordmanager',
  templateUrl: './passwordmanager.component.html',
  styleUrls: ['./passwordmanager.component.css']
})
export class PasswordmanagerComponent implements OnInit {
  user: any;
  keyList: [any];

  constructor(
    private apiService: ApiService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.getSavedDetails().subscribe( res => {
      let data = {} as any;
      data = res;
      this.user = data.user;
      this.keyList = this.user.info;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  //delete selected key from the list
  onClickDelete(selectedKey){
    //remove selected key
    var index = this.keyList.indexOf(selectedKey);
    if (index !== -1) this.keyList.splice(index, 1);
    var newData = {
      info: this.keyList
    }
    this.apiService.updateUserInfo(newData).subscribe( res => {
      if(res.success){
        this.flashMessages.show(res.msg, {cssClass: 'alert-success', timeout:3000});
      } else{
        this.flashMessages.show(res.msg, {cssClass: 'alert-danger', timeout:3000});
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
