import { Injectable } from '@angular/core';

@Injectable()
export class SharingService{
    private data:any = undefined;

    //pass image data to sharing services
    setImageSrc(data:any){
        this.data = data;
    }

    //retrieve data
    getImageSrc():any{
        return this.data;
    }
}
