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
  private idToIndexMap = new Map();

  constructor(private markerService: MarkerService, private imageService: ImageService, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.markerService.getMarkers().subscribe(markers => {
      this.markers = markers;
      this.setIndexToId()
      this.getImages()
    });
  }

  setIndexToId(){
    let index:number = 0;
    for(let marker of this.markers){
      this.idToIndexMap.set(marker.id, index);
      index=index+1;
    }
  }

  getImages(){
    for(let marker of this.markers){
      this.imageService.getImageFromService(marker.imagePath).subscribe(image => {
        this.createImageFromBlob(image, marker.id)
      })
    }
  }

  createImageFromBlob(image: Blob, id:number) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        this.markers[this.idToIndexMap.get(id)].image = reader.result;
     }, false);
     if (image) {
        reader.readAsDataURL(image);
     }
  }



}
