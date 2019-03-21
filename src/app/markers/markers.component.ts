import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Marker } from './marker';
import { MarkerService } from './marker.service';
import { ImageService } from './../markers/image.service';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements OnInit {

  titulo: String = "Algunos tags";
  array: Array<any>;
  markers: Marker[];
  imageToShow: any;
  arrayImagen: any[];
  private marker: Marker = new Marker();

  constructor(private markerService: MarkerService, private imageService: ImageService, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.markerService.getMarkers().subscribe(markers => {
      this.markers = markers;
      this.markers.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      this.getImages()
    });
  }

  getImages(){
    let index:number = 0;
    for(let marker of this.markers){
      this.imageService.getImageFromService(marker.imagePath).subscribe(image => {
        this.createImageFromBlob(image, index, marker.id)
        index=index+1;
      })
    }
  }

  createImageFromBlob(image: Blob, index:number, id:number) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        console.log("id",id)
        console.log("index",index)
        this.markers[index].image = reader.result;
     }, false);
     if (image) {
        reader.readAsDataURL(image);
     }
  }



}
