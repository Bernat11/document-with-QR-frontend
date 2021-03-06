import { Component, OnInit } from '@angular/core';
import { Marker } from './../markers/marker';
import { MarkerService } from './../markers/marker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from './../form/form.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  markers: Marker[];
  private marker: Marker = new Marker();

  constructor(private markerService: MarkerService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.markerService.getMarkers().subscribe(
      markers => this.markers = markers
    );
  }

  eliminar(id:number, index:number){
    console.log("borrando el marker", id)
    this.markerService.delete(id);
    this.markers.splice(index,1)
  }

  editar(marker: Marker, index:number){
    console.log("editando el marker", marker)
    marker.titulo = "EDITADO!"
    marker.descripcion = "EDITADO!"
    this.markerService.update(marker);
  }

}
