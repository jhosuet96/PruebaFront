import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ServiceService<T> {

  private endPoint : string = environment.endPoint; //"http://localhost:5000/";
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(controller:String, method:String):Observable<T[]>{
    return this.httpClient.get<any>(this.endPoint + controller + "/" + method ) as Observable<T[]>;
  }

  getByID(controller:string, method: string, id: number):Observable<T>{
    return this.httpClient.get(this.endPoint + controller + "/" + method + "/" + id) as Observable<T>;
  }

  Create(controller: string, method : string, obj: object):Observable<T>{
    return this.httpClient.post(this.endPoint + controller + "/" + method , JSON.stringify(obj),this.httpOptions) as Observable<T>;
  }

  getByIDPhone(controller:string, method: string):Observable<T[]>{
    return this.httpClient.get(this.endPoint + controller + "/" + method) as Observable<T[]>;
  }
}
