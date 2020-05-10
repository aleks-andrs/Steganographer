import { Component, OnInit } from '@angular/core';
import { ApiService } from "./../../services/api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {
  value0: String;
  value1: String;
  value2: String;
  value3: String;
  value4: String;
  value5: String;
  value6: String;
  value7: String;
  value8: String;
  value9: String;
  value10: String;
  value11: String;
  value12: String;
  value13: String;
  value14: String;
  value15: String;
  value16: String;
  value17: String;


  constructor(
    private router: Router
  ) { }

  //Generate a random id
  randomNumber() {
    return Math.floor(Math.random() * 1029);
  }

  ngOnInit(): void {
    this.value0 = "https://picsum.photos/id/"+this.randomNumber()+"/1366/768";
    this.value1 = "https://picsum.photos/id/"+this.randomNumber()+"/600/800";
    this.value2 = "https://picsum.photos/id/"+this.randomNumber()+"/720/1024";
    this.value3 = "https://picsum.photos/id/"+this.randomNumber()+"/1080/1080";
    this.value4 = "https://picsum.photos/id/"+this.randomNumber()+"/1280/720";
    this.value5 = "https://picsum.photos/id/"+this.randomNumber()+"/720/1280";

    this.value6 = "https://picsum.photos/id/"+this.randomNumber()+"/720/1024";
    this.value7 = "https://picsum.photos/id/"+this.randomNumber()+"/1080/1080";
    this.value8 = "https://picsum.photos/id/"+this.randomNumber()+"/1366/768";
    this.value9 = "https://picsum.photos/id/"+this.randomNumber()+"/1280/720";
    this.value10 = "https://picsum.photos/id/"+this.randomNumber()+"/720/1280";
    this.value11 = "https://picsum.photos/id/"+this.randomNumber()+"/600/800";

    this.value12 = "https://picsum.photos/id/"+this.randomNumber()+"/1080/1080";
    this.value13 = "https://picsum.photos/id/"+this.randomNumber()+"/1366/768";
    this.value14 = "https://picsum.photos/id/"+this.randomNumber()+"/720/1280";
    this.value15 = "https://picsum.photos/id/"+this.randomNumber()+"/600/800";
    this.value16 = "https://picsum.photos/id/"+this.randomNumber()+"/720/1024";
    this.value17 = "https://picsum.photos/id/"+this.randomNumber()+"/1280/720";
  }

  onClickGet(src){
    alert(src)
    this.router.navigate(['/encryption']);
  }

}
