import { Component, OnInit } from '@angular/core';
import { Marker } from './marker';
import { MarkerService } from './marker.service';
import { GlobalsService } from './../globals.service';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements OnInit {

  markers: Marker[];
  imageToShow: any;
  arrayImagen: any[];
  private titulo: string = "Algunos marcadores";
  private getMarkersEndpoints = new Map();
  private tipo:string;
  private tipos: String[] = [
    "Todos",
    "Monumentos",
    "Gastronomia",
    "Arte urbano",
    "Otras localizaciones"
  ];

  constructor(private markerService: MarkerService, private globals: GlobalsService){
    this.getMarkersEndpoints.set("Todos","http://" + this.globals.env + ":8070/api/markers")
    this.getMarkersEndpoints.set("Monumentos","http://" + this.globals.env + ":8070/api/markers/find?tipo=Monumento")
    this.getMarkersEndpoints.set("Arte urbano","http://" + this.globals.env + ":8070/api/markers/find?tipo=Arte urbano")
    this.getMarkersEndpoints.set("Gastronomia","http://" + this.globals.env + ":8070/api/markers/find?tipo=Gastronomia")
    this.getMarkersEndpoints.set("Otras localizaciones","http://" + this.globals.env + ":8070/api/markers/find?tipo=Otra localizacion")

  }

  ngOnInit() {
    this.markersByType("Todos", "Todos")
    this.tipo="Todos"
  }

  markersByType(type: string, titulo: string){
    this.markerService.getMarkers(this.getMarkersEndpoints.get(type)).subscribe(markers => {
      this.markers = markers;
      this.markers = this.markerService.setIndexToId(markers)
      this.markerService.getImages(markers)
      this.titulo = titulo;
    });
  }

}
