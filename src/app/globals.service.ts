import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  env: string = '192.168.1.36'
}
