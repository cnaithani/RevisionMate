import { Injectable } from '@angular/core';
import { AreasEndpoint } from './area-endpoint.service';
import { Area } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private areaEndpoint: AreasEndpoint) { }

  getAreas() {
    return this.areaEndpoint.getAreaEndpoint<[Area]>();
  }

  saveAreas(areaObj:any) {
    return this.areaEndpoint.postAreaEndpoint<[Area]>(areaObj);
  }
}
