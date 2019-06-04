import { Component, OnInit } from '@angular/core';
import { Marker } from './../markers/marker';
import { MarkerService } from './../markers/marker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from './../form/form.service';
import { GlobalsService } from './../globals.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  markers: Marker[];
  private marker: Marker = new Marker();
  editField: string;
  private backendEndpoint: string = 'http://' + this.globals.env + ':8070/api/markers';
  private getMarkersEndpoints = new Map();
  private tipo:string;
  private tipos: String[] = [
    "Todos",
    "Monumentos",
    "Gastronomia",
    "Arte urbano",
    "Otras localizaciones"
  ];

  constructor(private markerService: MarkerService, private router: Router, private activatedRoute: ActivatedRoute, private globals:GlobalsService) {
    this.getMarkersEndpoints.set("Todos","http://" + this.globals.env + ":8070/api/markers")
    this.getMarkersEndpoints.set("Monumentos","http://" + this.globals.env + ":8070/api/markers/find?tipo=Monumento")
    this.getMarkersEndpoints.set("Arte urbano","http://" + this.globals.env + ":8070/api/markers/find?tipo=Arte urbano")
    this.getMarkersEndpoints.set("Gastronomia","http://" + this.globals.env + ":8070/api/markers/find?tipo=Gastronomia")
    this.getMarkersEndpoints.set("Otras localizaciones","http://" + this.globals.env + ":8070/api/markers/find?tipo=Otra localizacion")
  }

  ngOnInit() {
    this.markersByType("Todos")
    this.tipo="Todos"
  }

  markersByType(type: string){
    this.markerService.getMarkers(this.getMarkersEndpoints.get(type)).subscribe(markers => {
      this.markers = markers;
      this.markers = this.markerService.setIndexToId(markers)
      this.markerService.getImages(markers)
    });
  }

  eliminar(id:number, index:number){
    console.log("borrando el marker", id)
    swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás deshacer los cambios!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          '¡Borrado!',
          'El archivo ha sido borrado.',
          'success'
        )
        this.markerService.delete(id);
        this.markers.splice(index,1)
      }
    })

  }

  changeValue(event: any){
    this.editField = event.target.textContent;
  }

  updateDescription(marker: Marker, index:number, event: any) {
    const editField = event.target.textContent;
    console.log("editando el marker", marker)
    marker.descripcion = event.target.textContent;
    // marker.titulo = "EDITADO!"
    // marker.descripcion = "EDITADO!"
    this.markerService.update(marker);
  }

  updateTitulo(marker: Marker, index:number, event: any) {
    const editField = event.target.textContent;
    console.log("editando el marker", marker)
    marker.titulo = event.target.textContent;
    // marker.titulo = "EDITADO!"
    // marker.descripcion = "EDITADO!"
    this.markerService.update(marker);
  }

}
