import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {API_ROOT} from "../config";

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) {
  }

  uploadFile(url: string, file: File, fields = {}): Observable<HttpEvent<any>> {

    let formData = new FormData();
    formData.append('upload_file', file);

    Object.keys(fields).forEach(key => {
      formData.append(key, fields[key]);
    });

    let params = new HttpParams();

    const options = {
      params: params
    };

    const req = new HttpRequest('POST', API_ROOT + url, formData, options);
    return this.http.request(req);
  }
}