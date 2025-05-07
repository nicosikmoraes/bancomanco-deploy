import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private api = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient, private router: Router) {}

      //Aqui eu pego os dados do banco de dados e jogo num Observable, que depois pode ser lido com .subscribe((obejto) => {...})
    public getClientes(): Observable<any>{
      return this.http.get(this.api);
    }
 
   
}
