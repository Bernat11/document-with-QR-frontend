import { Component, OnInit } from '@angular/core';
import { GlobalsService } from './../globals.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private backendEndpoint: string;

  constructor(private globals: GlobalsService) {
    this.backendEndpoint = 'http://' + this.globals.env + ':8070/swagger-ui.html';
  }

  ngOnInit() {
  }

}
