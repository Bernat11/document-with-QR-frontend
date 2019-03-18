import { Injectable } from '@angular/core';
import { Coordinate } from './coordinate';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public titulo: string = "¡Documenta con QR!";

  coord: Coordinate = new Coordinate(0,0);
  public coordStatus:Subject<Coordinate> = new BehaviorSubject<Coordinate>(this.coord);

  sendCoordinate(coordenada: Coordinate){
    this.coordStatus.next(coordenada);
  }

  getCoordinate():Observable<Coordinate>{
    return this.coordStatus.asObservable();
  }

  setTitulo(titulo:string){
    this.titulo = titulo;
  }


}
