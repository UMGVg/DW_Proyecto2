import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from './global.model';
import { TcRole } from '../models/tc-role';

@Injectable({
  providedIn: 'root'
})
export class TcUserService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  add(data: TcRole) {
    return this.http.post(Global.url + 'role/add', data);
  }

  update(data: TcRole, roleId: number) {
    return this.http.put(Global.url + 'role/' + roleId, data);
  }

  delete(roleId: number) {
    return this.http.delete(Global.url + 'role/' + roleId);
  }

  get(roleId: number) {
    return this.http.get(Global.url + 'role/' + roleId);
  }

  getAll(queryParams?: any) {
    let options = {};
    if (queryParams) {
      options = {
        params: new HttpParams()
          .set('page', queryParams.pageIndex.toString())
          .set('pageSize', queryParams.pageSize.toString())
          .set('sortActive', queryParams.sortActive)
          .set('sortDirection', queryParams.sortDirection)
          .set('filter', queryParams.filter)
      };
    }
    return this.http.get(Global.url + 'role/all', options);
  }

  getAllActive() {
    return this.http.get(Global.url + 'role/all/active');
  }
  
}
