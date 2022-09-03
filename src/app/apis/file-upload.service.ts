import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  /*
   * Note :
   * For base url "https://file.io" to send formData param as "file"
   * For base url "http://localhost:4000/upload" to send formData param as "profile"
   */
  private baseApiUrl = "https://file.io" || 'http://localhost:4000/upload'
  private formDataParam = "file" || "profile";
    
  constructor(private http:HttpClient) { }
  
  public upload(file):Observable<any> {
      const formData = new FormData(); 
      formData.append(this.formDataParam, file, file.name);
      return this.http.post(this.baseApiUrl, formData)
  }

  
  uploadFile(file: File): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    let formData = new FormData();
    formData.append('file', file, file.name);
    
    let params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
      headers
    };
    const req = new HttpRequest('POST', this.baseApiUrl, formData, options);
    return this.http.request(req);
  }

}
