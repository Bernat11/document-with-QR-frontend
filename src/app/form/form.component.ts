import { Component, OnInit, Input } from '@angular/core';
import { Marker } from './../markers/marker';
import { MarkerService} from './../markers/marker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapComponent } from './../map/map.component';
import { Coordinate } from './../map/coordinate';
import { MapService } from './../map/map.service';
import { Subscription } from 'rxjs';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  private titulo: string = "Crea un geotag";
  private createQRbool: boolean = false;
  private coordenada: Coordinate;
  private marker: Marker = new Marker();
  private imagenURL: String = "../../assets/default.jpg";
  private imageToUpload: File = null;
  private QRimage: any;
  subscription: Subscription;
  lat: number;
  lng: number;

  private tipos: String[] = [
    "Monumento",
    "Gastronomia",
    "Arte urbano",
    "Otra localizacion"
  ]

  constructor(private markerService: MarkerService, private router: Router, private activatedRoute: ActivatedRoute,
    private mapService: MapService, private formService: FormService) {
      mapService.setTitulo(this.titulo)
      this.subscription = this.mapService.getCoordinate().subscribe(coordenada => {
        this.coordenada = coordenada;
        console.log(coordenada);
        this.getActualMarker(coordenada);
      });
  }

  create(): void {
    this.formService.create(this.marker, this.imageToUpload).subscribe(id => {
      this.formService.createQR(id).subscribe(qrimgage => {
        this.createImageFromBlob(qrimgage)
      })
      // this.router.navigate(['/ver', id]);
    })
  }

  // waitToCreate(){
  //   this.createQRbool = true;
  // }

  actualizarImagen(file: FileList){
    this.imageToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imagenURL = event.target.result;
    }
    reader.readAsDataURL(this.imageToUpload);
  }

  getActualMarker(coordenada: Coordinate){
    this.marker.latitud = Number(this.coordenada.lat);
    this.marker.longitud = this.coordenada.lng;
  }

  createImageFromBlob(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        this.QRimage = reader.result;
        console.log(this.QRimage)
     }, false);
     if (image) {
        reader.readAsDataURL(image);
     }
  }



}
