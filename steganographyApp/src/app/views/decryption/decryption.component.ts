import { Component, OnInit } from '@angular/core';
import { StrEncryptionService } from "./../../services/str.encryption.service";
import { ValidateService } from './../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decryption',
  templateUrl: './decryption.component.html',
  styleUrls: ['./decryption.component.css']
})
export class DecryptionComponent implements OnInit {
  decryptedText: string;
  decryptionKey: string;
  imageVisible: boolean;

  constructor(
    private strEncryptionService: StrEncryptionService,
    private validateService: ValidateService,
    public apiService: ApiService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.imageVisible = false;
  }


  //select decryption key
  onClickSelectKey(){
    this.router.navigate(['/passwordManager']);
  }


  //decrypt button
  onClickDecrypt() {
    this.imageVisible = true;
    //get user input
    decryptionKey: this.decryptionKey;
    this.decryptedText = " ";
    //validate decryption key
    if(!this.validateService.validateEntry(this.decryptionKey)){
      this.flashMessages.show('Decryption key missing', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    if(!this.validateService.validateEntryLength(this.decryptionKey)){
      this.flashMessages.show('Decryption key must be 4 to 12 symbols long', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    //set decryption key
    this.strEncryptionService.setPassword(this.decryptionKey);
    //decrypt text
    let decryptedText = this.strEncryptionService.decrypt(" ");
    //display decrypted text
    this.decryptedText = "Works";
  }


  //simulate button press on 'fileUpload' button
  onClickBrowse(){
    let element: HTMLElement = document.getElementById('fileUpload') as HTMLElement;
    element.addEventListener("change", this.uploadImage);
    element.click();
  }


  //select and upload image
  uploadImage(event: any){
    var file =  event.target.files[0];
    //check the uploaded file type
    if(file.type.indexOf("image") !== -1){
      //this.previewImage(file);
      var reader = new FileReader();
      var image = new Image;
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        image.src = URL.createObjectURL(file);
        image.onload = function() {
          let imageElement: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement;
          imageElement.src = image.src
        }
      }
    } else {
      alert("File: " + file.name + " is not an image type");
    }
  }

}
