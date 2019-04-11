import { Component, OnInit } from '@angular/core';
import { MarkerService } from './../markers/marker.service';
import { Marker } from './../markers/marker';
import { Coordinate } from './coordinate';
import { MapService } from './map.service';
import { GlobalsService } from './../globals.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  private titulo: string;
  private center_lat: number = 41.387808;
  private center_lng: number = 2.1691757;
  private iconLocation:String = "../../assets/icon.png";

  private actualLat: number;
  private actualLng: number;

  markers: Marker[];
  coordenadas: Coordinate[];
  coordinate: Coordinate;
  // title: string = 'My first AGM project';
  private backendEndpoint: string = 'http://' + this.globals.env + ':8070/api/markers';

  constructor(private markerService: MarkerService, private mapService: MapService, private globals:GlobalsService){
    this.titulo = mapService.titulo;
  }

  ngOnInit(){
    this.markerService.getMarkers(this.backendEndpoint).subscribe(
      markers => {this.markers = markers;
        console.log(markers)
        // var index:number = 0;
        // for(let marker of markers){
        //   this.markers[index].lat=Number(marker.lat);
        //   this.markers[index].lng=Number(marker.lng);
        //   console.log(marker.latitud)
        //   console.log(this.markers[index].lng)
        // }
    });
  }

  placeMarker($event){
    this.actualLat = $event.coords.lat;
    this.actualLng = $event.coords.lng;
    // console.log(this.actualLat);
    // console.log(this.actualLng);
    this.prepareCoordinate();
    // this.formComponent.getActualMarker(this.actualLat, this.actualLng)
  }

  prepareCoordinate(){
    this.coordinate= new Coordinate(this.actualLat, this.actualLng)
    this.sendCoordinate(this.coordinate);
  }

  sendCoordinate(coordinate: Coordinate){
    console.log(coordinate)
    this.mapService.sendCoordinate(coordinate);
  }

}
