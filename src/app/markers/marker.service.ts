import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Marker } from './marker';
import { map } from 'rxjs/operators';
import { GlobalsService } from './../globals.service';
import { ImageService } from './../markers/image.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private backendEndpoint: string = 'http://' + this.globals.env + ':8070/api/markers';
  private httpHeaders = new HttpHeaders({'Content-Type': 'undefined'});
  private idToIndexMap = new Map();

  constructor(private imageService: ImageService, private http: HttpClient, private globals: GlobalsService) {

  }

  getMarkers(endpoint: string): Observable<Marker[]>{
    return this.http.get(endpoint).pipe(
      map(response => response as Marker[])
    );
  }

  getMarker(id:any): Observable<Marker>{
    return this.http.get<Marker>(`${this.backendEndpoint}/${id}`)
  }

  createMarkerWithImage(marker: Marker, imageToUpload: File) : Observable<Marker>{
    console.log("creando marker con imagen...")
    var formData = new FormData();
    formData.append('stringMarker', JSON.stringify(marker));
    formData.append('imagen', imageToUpload);
    return this.http.post<Marker>('http://' + this.globals.env + ':8070/api/markers', formData)
  }

  update(marker: Marker){
    console.log("se va a hacer el http update", marker)
    var formData = new FormData();
    formData.append('titulo', marker.titulo)
    formData.append('descripcion', marker.descripcion)
    return this.http.put(`${this.backendEndpoint}/${marker.id}`, formData).subscribe((res) => {
    });
  }

  delete(id: number){
    console.log(`${this.backendEndpoint}/${id}`)
    return this.http.delete(`${this.backendEndpoint}/${id}`, {headers: this.httpHeaders}).subscribe((res) => {
    });
  }

  ////////

  setIndexToId(markers: Marker[]):Marker[]{
    let index:number = 0;
    for(let marker of markers){
      this.idToIndexMap.set(marker.id, index);
      index=index+1;
    }
    return markers;
  }

  getImages(markers: Marker[]): Marker[]{
    for(let marker of markers){
      this.imageService.getImageFromService(marker.imagePath).subscribe(image => {
        this.createImageFromBlob(image, marker.id, markers)
      })
    }
    return markers;
  }

  createImageFromBlob(image: Blob, id:number, markers: Marker[]) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        markers[this.idToIndexMap.get(id)].image = reader.result;
     }, false);
     if (image) {
        reader.readAsDataURL(image);
     }
  }

}
