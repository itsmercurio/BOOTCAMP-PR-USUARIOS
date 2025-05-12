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
    const urlEndpoint: string = "http://localhost:8080/users/usuarios";
    return this.http.get<User[]>(urlEndpoint);
  }
}
