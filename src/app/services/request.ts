import {Injectable} from '@angular/core';
import {API_ROOT} from "../config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {EmitterService} from "./emitter.service";

@Injectable()
export class RequestService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    EmitterService.get(EmitterService.keys.TOKEN).subscribe(token => {
      this.headers = new HttpHeaders();
      this.headers = this.headers.set('Authorization', 'JWT ' + token);
    })
  }

  get(entity: string, id: string = ''): Observable<any> {
    id = id ? `/${id}` : '';
    return this.http.get(`${API_ROOT}/${entity}${id}`, {headers: this.headers})
      .catch((response: any) => Observable.of(response.error));
  }

  post(entity: string, body: any = {}): Observable<any> {
    return this.http.post(`${API_ROOT}/${entity}`, body, {headers: this.headers})
      .catch((response: any) => Observable.of(response.error));
  }

  delete() {

  }
}