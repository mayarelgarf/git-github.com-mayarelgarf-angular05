import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment.prod';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private httpClient:HttpClient,private token:AuthService , ) { }
   
  


  
  order(orderData:any){
    return this.httpClient.post(`${environment.apiUrl}orders`,orderData, {headers:({
      'Content-Type': 'application/json',
      'x-access-token': this.token.getToken()
  })})
  }
}