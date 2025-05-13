import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  public getUsers():Observable<User[]>{
    const urlEndpoint: string = "http://localhost:8080/users/api/usuarios";
    return this.http.get<User[]>(urlEndpoint);
  }

  public getRoles(): Observable<string[]> {
    const urlEndpoint: string = "http://localhost:8080/users/api/roles";
    return this.http.get<string[]>(urlEndpoint);
  }

  public createUser(user: any): Observable<any>{
    const urlEndpoint: string = "http://localhost:8080/users/api/usuarios";
    return this.http.post<any>(urlEndpoint,user);
  }
}
