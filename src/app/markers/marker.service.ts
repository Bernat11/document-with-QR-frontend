import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Marker } from './marker';
import { map } from 'rxjs/operators';
import { GlobalsService } from './../globals.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private backendEndpoint: string = 'http://' + this.globals.env + ':8070/api/markers';
  private httpHeaders = new HttpHeaders({'Content-Type': 'undefined'});
  private marker: Marker;

  constructor(private http: HttpClient, private globals: GlobalsService) {}

  getMarkers(): Observable<Marker[]>{
    return this.http.get(this.backendEndpoint).pipe(
      map(response => response as Marker[])
    );
  }

  getMarker(id): Observable<Marker>{
    return this.http.get<Marker>(`${this.backendEndpoint}/${id}`)
  }

  // getImage(imagePath: string): Observable<Blob> {
  //   return this.http.get(imagePath, { responseType: 'blob' });
  // }

  // createMarker(marker: Marker, imageToUpload: File) : Observable<Object> {
  //   console.log("creando marker...")
  //   const httpOptions = {
  //     headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
  //   }
  //   this.httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
  //   this.formData.append('imagen', imageToUpload)
  //   var markerJSON = JSON.stringify(marker);
  //   this.formData.append('marker', markerJSON)
  //   return this.http.post(this.backendEndpoint, this.formData, httpOptions)
  // }

  createMarkerWithImage(marker: Marker, imageToUpload: File) : Observable<Marker>{
    console.log("creando marker con imagen...")
    var formData = new FormData();
    // formData.append('imagen', imageToUpload)
    // formData.append('titulo', marker.titulo)
    // formData.append('descripcion', marker.descripcion)
    // formData.append('link', marker.link)
    // formData.append('tipo', marker.tipo)
    // formData.append('lat', String(marker.latitud))
    // formData.append('long', String(marker.longitud))
    formData.append('stringMarker', JSON.stringify(marker));
    formData.append('imagen', imageToUpload);
    return this.http.post<Marker>('http://' + this.globals.env + ':8070/api/markers', formData)
  }

  // createImage(imageToUpload: File) : Observable<Object>{
  //   this.backendEndpoint = 'http://localhost:8070/api/markers/image';
  //   this.httpHeaders = new HttpHeaders({'Content-Type': 'image/jpeg'})
  //   console.log("creando imagen...")
  //   return this.http.post<Object>(this.backendEndpoint, imageToUpload)
  // }

  // createMarker(marker: Marker) : Observable<Marker>{
  //   console.log("creando marker...")
  //   this.backendEndpoint = 'http://localhost:8070/api/markers/marker';
  //   this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  //   return this.http.post<Marker>(this.backendEndpoint, marker, {headers: this.httpHeaders})
  // }

  update(marker: Marker){
    console.log("se va a hacer el http update", marker)
    // var edit: String[]=[marker.titulo, marker.description]
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

}
