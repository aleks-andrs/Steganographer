import { Component, OnInit } from '@angular/core';
import { StrEncryptionService } from "./../../services/str.encryption.service";
import { ValidateService } from './../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {
  textToEncrypt: string;
  encryptionPassword: string;
  imageVisible: boolean;
  user: any;
  keyList: [any];

  constructor(
    private strEncryptionService: StrEncryptionService,
    private validateService: ValidateService,
    public apiService: ApiService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.imageVisible = false;
    //get the list of all keys associated with user
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

  onClickSaveKey(){
    encryptionPassword: this.encryptionPassword;
    //Validate encryption key field
    if(!this.validateService.validateEntry(this.encryptionPassword)){
      this.flashMessages.show('Encryption key missing', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    if(!this.validateService.validateEntryLength(this.encryptionPassword)){
      this.flashMessages.show('Encryption key must be 4 to 12 symbols long', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    //insert key in the list
    this.keyList.push(this.encryptionPassword);
    //save in the appropriate format
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

  onClickEncrypt() {
    this.imageVisible = true;
    //get user input
    textToEncrypt: this.textToEncrypt;
    encryptionPassword: this.encryptionPassword;
    //Validate text field
    if(!this.validateService.validateEntry(this.textToEncrypt)){
      this.flashMessages.show('No text provided for encryption', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    //Validate encryption key field
    if(!this.validateService.validateEntry(this.encryptionPassword)){
      this.flashMessages.show('Encryption key missing', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    if(!this.validateService.validateEntryLength(this.encryptionPassword)){
      this.flashMessages.show('Encryption key must be 4 to 12 symbols long', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    //set password
    this.strEncryptionService.setPassword(this.encryptionPassword);
    //encrypt text
    let encryptedText = this.strEncryptionService.encrypt(this.textToEncrypt);
    alert(encryptedText);
  }


  //simulate browse button click
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
      //set image name
      document.getElementById('lblUpload').innerHTML = file.name;
      //read image
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
      alert("File " + file.name + " is not an image type");
    }
  }
}
