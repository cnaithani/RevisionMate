// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './configuration.service';


@Injectable()
export class AreasEndpoint extends EndpointBase {
  endpointUrl = 'https://localhost:44350';
  get getAreasUrl() { return this.endpointUrl + '/api/AreaMaster'; }
  get postAreasUrl() { return this.endpointUrl + '/api/AreaMaster'; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }


  getAreaEndpoint<T>(): Observable<T> {
    const endpointUrl = `${this.getAreasUrl}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getAreaEndpoint());
      }));
  }

  postAreaEndpoint<T>(areaObject: any): Observable<T> {
    const endpointUrl = `${this.postAreasUrl}`;

    return this.http.post<T>(endpointUrl, JSON.stringify(areaObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.postAreaEndpoint(areaObject));
      }));
  }

  
}
