import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';
import { SharingService } from './../../services/sharing.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {
  data:any = {text: "example"};
  image1: any;
  image2: any;
  image3: any;
  image4: any;
  image5: any;
  image6: any;
  image7: any;
  image8: any;
  image9: any;

  constructor(
    private apiService: ApiService,
    private sharingService: SharingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //load images from Picsum API
    this.getImagesFromAPI();
  }

  //get image src and pass to encoding component
  onClickGet(src){
    this.sharingService.setImageSrc(src);
    this.router.navigate(['/encoding']);
  }

  getImagesFromAPI(){
    this.apiService.getImage("https://picsum.photos/1366/768").subscribe(res => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.image1 = reader.result;
      }, false);
      if (res) {
        reader.readAsDataURL(res);
      }
    }, error => {
      console.log(error);
    });

    this.apiService.getImage("https://picsum.photos/750/750").subscribe(res => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.image2 = reader.result;
      }, false);
      if (res) {
        reader.readAsDataURL(res);
      }
    }, error => {
      console.log(error);
    });

    this.apiService.getImage("https://picsum.photos/720/1024").subscribe(res => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.image3 = reader.result;
      }, false);
      if (res) {
        reader.readAsDataURL(res);
      }
    }, error => {
      console.log(error);
    });

    this.apiService.getImage("https://picsum.photos/720/1024").subscribe(res => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.image4 = reader.result;
      }, false);
      if (res) {
        reader.readAsDataURL(res);
      }
    }, error => {
      console.log(error);
    });

    this.apiService.getImage("https://picsum.photos/1366/768").subscribe(res => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.image5 = reader.result;
      }, false);
      if (res) {
        reader.readAsDataURL(res);
      }
    }, error => {
      console.log(error);
    });

    this.apiService.getImage("https://picsum.photos/750/750").subscribe(res => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.image6 = reader.result;
      }, false);
      if (res) {
        reader.readAsDataURL(res);
      }
    }, error => {
      console.log(error);
    });

    this.apiService.getImage("https://picsum.photos/750/750").subscribe(res => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.image7 = reader.result;
      }, false);
      if (res) {
        reader.readAsDataURL(res);
      }
    }, error => {
      console.log(error);
    });

    this.apiService.getImage("https://picsum.photos/720/1024").subscribe(res => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.image8 = reader.result;
      }, false);
      if (res) {
        reader.readAsDataURL(res);
      }
    }, error => {
      console.log(error);
    });

    this.apiService.getImage("https://picsum.photos/1366/768").subscribe(res => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.image9 = reader.result;
      }, false);
      if (res) {
        reader.readAsDataURL(res);
      }
    }, error => {
      console.log(error);
    });

  }
}
