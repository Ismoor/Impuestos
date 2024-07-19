import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modelos/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) {
    console.log('El servicio Http esta funcionando…');
    }
  obtenerUsuarios(){
    return this.httpclient.get<User[]>('https://jsonplaceholder.typicode.com/users');
    }
}
