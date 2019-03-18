import { Injectable } from '@angular/core';
import { Marker } from './../markers/marker';
import { MarkerService} from './../markers/marker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapService } from './../map/map.service';
import { Coordinate } from './../map/coordinate';
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from './../globals.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private marker: Marker;
  private coordenada: Coordinate;
  private imageToUpload: File = null;
  private imagenURL: String = "../../assets/default.jpg";
  public coordStatus:Subject<Coordinate> = new BehaviorSubject<Coordinate>(null);

  constructor(private markerService: MarkerService, private router: Router, private mapService: MapService, private http: HttpClient, private globals: GlobalsService) {}

  create(marker: Marker, imageToUpload: File): Observable<number> {
    let bSubject = new BehaviorSubject(0);
    this.markerService.createMarkerWithImage(marker, imageToUpload).subscribe(marker => {
        // this.router.navigate(['/listar'])
        bSubject.next(marker.id)
      });
      return bSubject
  }

  createQR(id: number):Observable<Blob>{
    console.log("llamando al QR")
    console.log(id)
    var url:string = 'http://' + this.globals.env + ':4200/ver/' + id;
    const getheaders = new HttpHeaders({'url':url,'height':'300','width':'300','id':String(id)});
    return this.http.get('http://' + this.globals.env + ':8070/api/encodeurl',
      {headers: getheaders, responseType: 'blob'}
    )
  }

  // getQR(QR_UUID: String):Observable<Blob>{
  //   return this.http.get(`${this.backendEndpoint}/image/${UUID}`, { responseType: 'blob' })
  // }

}
