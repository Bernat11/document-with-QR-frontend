import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { GlobalsService } from './../globals.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageToShow: any;
  private backendEndpoint: string;

  constructor(private http: HttpClient, private globals: GlobalsService) {
    this.backendEndpoint = 'http://' + this.globals.env + ':8070/api/markers';
  }

  getImageFromService(UUID: String):Observable<Blob>{
    console.log("recuperando la imagen de ", `${this.backendEndpoint}/image/${UUID}`)
    return this.http.get(`${this.backendEndpoint}/image/${UUID}`, { responseType: 'blob' })
  }

}
