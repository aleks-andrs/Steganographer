import { Component, OnInit } from '@angular/core';
import { StrEncryptionService } from "./../../services/str.encryption.service";
import { ValidateService } from './../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from './../../services/api.service';
import { SharingService } from './../../services/sharing.service';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {
  imageSrc:any;
  textToEncrypt: string;
  encryptionPassword: string;
  isVisible: boolean;
  user: any;
  keyList: [any];

  constructor(
    private strEncryptionService: StrEncryptionService,
    private validateService: ValidateService,
    private sharingService: SharingService,
    public apiService: ApiService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.isVisible = false;
    this.imageSrc = this.sharingService.getImageSrc();
    try{
      if(this.imageSrc){
        let imageElement: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement;
        imageElement.src = this.imageSrc;
      }
    } catch(err){
      console.log(err);
    }



    if(this.apiService.loggedIn()){
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
  }

  onClickSaveKey(){
    encryptionPassword: this.encryptionPassword;
    //Validate encryption key field
    if(!this.validateService.validateEntry(this.encryptionPassword)){
      this.flashMessages.show('Encryption key is missing', {cssClass: 'alert-danger', timeout:3000});
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

    //get chosen image
    let imageElement: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement;
    var imgWidth = imageElement.naturalWidth;
    var imgHeight = imageElement.naturalHeight;

    //check if text length is too long to be encoded in the picture
    if (((encryptedText.length+32) * 8) > (imgHeight * imgWidth * 3)) {
      this.flashMessages.show("Provided text is too long for this picture", {cssClass: 'alert-danger', timeout:3000});
      return;
    }
    //convert text to binary
    var binaryCode = this.convertTextToBinary(encryptedText);
    //encode binary code inside the picture
    this.encodeBinaryIntoImage(binaryCode);
  }

  //text to binary converter
  convertTextToBinary(cryptoText){
    function zeroPad(idx) {
        return "00000000".slice(String(idx).length) + idx;
    }
    return cryptoText.replace(/[\s\S]/g, function(cryptoText) {
        cryptoText = zeroPad(cryptoText.charCodeAt().toString(2));
        return cryptoText
    });
  }

  encodeBinaryIntoImage(binaryTxt){
    //create canvas objects
    var originalCanvas = document.createElement("canvas");
    var newCanvas = document.createElement("canvas");
    //get selected image details
    let selectedImageElement: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement;
    var canvasWidth = selectedImageElement.naturalWidth;
    var canvasHeight = selectedImageElement.naturalHeight;
    //set canvas dimensions
    originalCanvas.height = canvasHeight;
    originalCanvas.width = canvasWidth;
    newCanvas.height = canvasHeight;
    newCanvas.width = canvasWidth;
    //generate context
    var originalContext = originalCanvas.getContext("2d");
    var newCanvasContext = newCanvas.getContext("2d");
    //set context
    originalContext.drawImage(selectedImageElement, 0, 0);
    //read pixel data
    var origImageData = originalContext.getImageData(0, 0, canvasWidth, canvasHeight);
    var pixelData = origImageData.data;
    //append binary text with 2 empty bytes(start flag)
    binaryTxt = "1000000100000001" + binaryTxt;
    //get binary text length and add space for 2 more empty bytes(16 bits) at the end
    var lengthBinary = Math.ceil(binaryTxt.length/3)*4+16;
    //equalize the data and encode binary message
    var counter = 0;
    for (var i = 0, n = lengthBinary; i < n; i += 4) {
      for (var pixelValue = 0; pixelValue < 3; pixelValue ++) {
        if (counter < binaryTxt.length) {
          if (pixelData[i + pixelValue] %2 != 0){
            pixelData[i + pixelValue]--;
          }
          pixelData[i + pixelValue] += parseInt(binaryTxt[counter]);
          counter++;
        }
        else {
          //attach empty bytes at the end of the string
          if (pixelData[i + pixelValue] %2 != 0){
            pixelData[i + pixelValue]--;
          }
        }
      }
    }
    //upload pixels with encoded string to the canvas and convert to png image
    newCanvasContext.putImageData(origImageData, 0, 0);
    newCanvasContext.drawImage(newCanvas, 0, 0, canvasWidth, canvasHeight);
    var newImage = new Image();
    newImage.src = newCanvas.toDataURL("image/png");
    this.isVisible = true;
    //load new picture
    let generatedImageElement: HTMLImageElement = document.getElementById('resultImage') as HTMLImageElement;
    generatedImageElement.src = newImage.src;
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
      alert("Selected file is not an image type");
    }
  }
}
