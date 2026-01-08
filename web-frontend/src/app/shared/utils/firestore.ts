import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {NgxImageCompressService} from "ngx-image-compress";
import {DatePipe} from "@angular/common";

@Injectable()
export class Firestore {
  title = 'cloudsSorage';

  constructor(public firebaseStorage: AngularFireStorage, private imageCompressor: NgxImageCompressService, private datePipe: DatePipe) {
  }

  async saveImages(file: any): Promise<any> {
    const n = Date.now();
    const filePath = `Images/${n}`;
    const fileRef = this.firebaseStorage.ref(filePath);
    console.log(file);
    await this.firebaseStorage.upload(`Images/${n}`, file);
    const url = fileRef.getDownloadURL().toPromise();
    return url;
  }

  getImage(url: string): Observable<any> {
    return this.firebaseStorage.ref(url).getDownloadURL();
  }

  validateImage(file: any): boolean {
    if (file.size / 1048576 > 5) {
      return false;
    } else {
      return true;
    }
  }


  async getBase64Image(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = resolve;
      fileReader.readAsDataURL(file);
    });
  }
}
