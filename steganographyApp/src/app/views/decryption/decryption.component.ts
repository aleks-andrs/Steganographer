import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decryption',
  templateUrl: './decryption.component.html',
  styleUrls: ['./decryption.component.css']
})
export class DecryptionComponent implements OnInit {
  clickMessage = '';

  constructor() { }

  ngOnInit(): void {
  }

  onClickDecrypt() {
    this.clickMessage = "msg";
    alert(this.clickMessage);
  }

}
