import {Injectable} from '@angular/core';
import {API_ROOT} from "../config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Emitter} from "./emitter.service";
import {APIResponse, ResponseModel} from "../models/response";

@Injectable()
export class RequestService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    Emitter.get(Emitter.keys.TOKEN).subscribe(token => {
      this.headers = new HttpHeaders();
      this.headers = this.headers.set('Authorization', 'Bearer ' + token);
    })
  }

  get(entity: string, id: string = '', endpoint: string = ''): Observable<any> {
    id = id ? `/${id}` : '';
    endpoint = endpoint ? `/${endpoint}` : '';
    return this.http.get(`${API_ROOT}/${entity}${id}${endpoint}`, {headers: this.headers})
      .map((response: ResponseModel) => new APIResponse(response))
      .catch(response => Observable.of(new APIResponse(response.error)));
  }

  post(entity: string, body: any = {}): Observable<any> {
    return this.http.post(`${API_ROOT}/${entity}`, body, {headers: this.headers})
      .map((response: ResponseModel) => new APIResponse(response))
      .catch(response => Observable.of(new APIResponse(response.error)));
  }

  delete() {

  }
}