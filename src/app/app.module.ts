import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';

import { AgmCoreModule } from '@agm/core';
import { FooterComponent } from './footer/footer.component';
import { MarkersComponent } from './markers/markers.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule} from "@angular/common/http";

import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { MapService } from './map/map.service';

import { GlobalsService } from './globals.service';
import { FullmapComponent } from './fullmap/fullmap.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    FooterComponent,
    MarkersComponent,
    FormComponent,
    HomeComponent,
    PageNotFoundComponent,
    ListComponent,
    CardComponent,
    FullmapComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'crear', component: FormComponent},
      { path: 'listar', component: ListComponent},
      { path: 'ver/:id', component: CardComponent},
      { path: '**', component: PageNotFoundComponent }
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCiL4UvXT99dAEKg3Zp8fvhEqRwcTY4Ia8'
    })
  ],
  providers: [MapService, GlobalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
