import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  onLogin(obj:any){
    return this.http.post("https://reqres.in/api/login",obj)
  }
}
