import { Component, OnInit } from '@angular/core';
import { Marker } from './../markers/marker';
import { MarkerService} from './../markers/marker.service';
import { Router, ActivatedRoute } from '@angular/router'
import { ImageService } from './../markers/image.service';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from './../globals.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  private marker: Marker = new Marker();
  imageToShow: any;
  qrToShow: any;
  private backendEndpoint: string;

  constructor(private markerService: MarkerService, private imageService: ImageService, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private globals: GlobalsService) {
    this.backendEndpoint = 'http://' + this.globals.env + ':8070/api/markers';
  }

  private sub: any;
  id: number;

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
       this.id = +params['id'];
     });
    this.markerService.getMarker(this.id).subscribe(marker => {
      this.marker = marker
      this.getImageFromService(marker.imagePath)
      this.getQRFromService(marker.id)
    });
    // this.getImageFromService(this.id)
  }

  getImageFromService(UUID: String){
        this.getImage(UUID).subscribe(data => {
        this.createImageFromBlob(data);
      });
  }

  getQRFromService(id: number){
        this.getqr(id).subscribe(data => {
        this.createqrFromBlob(data);
      });
  }

  getImage(UUID: String) : Observable<Blob>{
    console.log("recuperando la imagen de ", `${this.backendEndpoint}/image/${UUID}`)
    return this.http.get(`${this.backendEndpoint}/image/${UUID}`, { responseType: 'blob' })
  }

  getqr(id: number) : Observable<Blob>{
    console.log("recuperando la imagen de ", `${this.backendEndpoint}/image/${id}`)
    return this.http.get(`${this.backendEndpoint}/image/${id}`, { responseType: 'blob' })
  }

  createImageFromBlob(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
     }, false);

     if (image) {
        reader.readAsDataURL(image);
     }
  }

  createqrFromBlob(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        this.qrToShow = reader.result;
     }, false);

     if (image) {
        reader.readAsDataURL(image);
     }
  }

}
