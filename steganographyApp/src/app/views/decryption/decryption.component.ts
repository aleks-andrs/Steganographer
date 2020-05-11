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


  //select decryption key from password manager
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

    //generate canvas object
    var originalCanvas = document.createElement("canvas");
    let selectedImageElement: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement;
    var canvasWidth = selectedImageElement.naturalWidth;
    var canvasHeight = selectedImageElement.naturalHeight;
    //set canvas dimensions
    originalCanvas.height = canvasHeight;
    originalCanvas.width = canvasWidth;
    //create context
    var originalContext = originalCanvas.getContext("2d");
    //set context
    originalContext.drawImage(selectedImageElement, 0, 0);
    //get pixel data from the image
    var origImageData = originalContext.getImageData(0, 0, canvasWidth, canvasHeight);
    var pixelData = origImageData.data;
    var binaryTxt = "";
    var stopFlagCount = 0;
    //read binary from the picture
    for (var i = 0, n = pixelData.length; i < n; i += 4) {
      for (var pixelValue =0; pixelValue < 3; pixelValue ++) {
        var bit = 0;
        if(pixelData[i + pixelValue] %2 != 0) {
          bit = 1;
          //reset end flag counter
          stopFlagCount = 0;
        }
        stopFlagCount += 1;
        binaryTxt += bit;
        //stop reading binary when end flag reached
        if(stopFlagCount>12){
          break;
        }
      }
    }
    //insert a space after every 8 bits
    binaryTxt = binaryTxt.match(/.{1,8}/g).join(" ");
    //convert to arrray
    var newBinary = binaryTxt.split(" ");
    //check for start flag(first 2 empty bits)
    if(newBinary[0]=="10000001" && newBinary[1]=="00000001"){
      //remove the flag from the list
       newBinary.splice(0,2);
    } else{
      this.flashMessages.show("Provided image does not contain a message", {cssClass: 'alert-danger', timeout:3000});
      return;
    }
    var binaryCode = [];
    //read data until the first empty byte
    for (i = 0; i < newBinary.length; i++) {
      if(newBinary[i] != "00000000"){
        binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
      } else{
        break;
      }
    }
    //get encrypted text
    var encryptedText = binaryCode.join("");
    //set decryption key
    this.strEncryptionService.setPassword(this.decryptionKey);
    //decrypt text
    let decryptedTextMessage = this.strEncryptionService.decrypt(encryptedText);
    //display decrypted text
    this.decryptedText = decryptedTextMessage;
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
      alert("File: " + file.name + " is not an image type");
    }
  }

}
