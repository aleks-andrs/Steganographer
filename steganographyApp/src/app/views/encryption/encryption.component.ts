import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {
  clickMessage = '';

  constructor() { }

  ngOnInit(): void {
  }

  onClickEncrypt(msg) {
    this.clickMessage = msg;
    alert(this.clickMessage);
  }

}
