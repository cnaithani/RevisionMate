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

  get areasUrl() { return this.configurations.baseUrl + '/api/AreaMaster'; }


  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }


  getAreaEndpoint<T>(userId: string): Observable<T> {
    const endpointUrl = `${this.areasUrl}/${userId}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getAreaEndpoint(userId));
      }));
  }

  
}
