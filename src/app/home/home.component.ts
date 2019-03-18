import { Component, OnInit } from '@angular/core';
import { MapService } from './../map/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private titulo: string = "Documenta con QR";

  constructor(private mapService: MapService) {
    this.mapService.setTitulo(this.titulo)
  }

  ngOnInit() {  }

}
