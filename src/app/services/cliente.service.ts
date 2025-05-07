import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Cliente from '../cadastro/model/cliente';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private api = 'http://localhost:3000/clientes'; // Link do meu "banco de dados"
  public bancoPage: boolean = false;
  public navbar: boolean = true;

  constructor(private http: HttpClient, private router: Router) { } // Serve para poder usar GET, POST, etc...

  public adicionarCliente(cliente: Cliente): Observable<Cliente> {
    console.log(cliente, "Cliente Service, será apagado logo!");
    return this.http.post<Cliente>(this.api, cliente); // O <Cliente> significa que faz uma requisição do tipo POST e espera que a resposta seja do tipo Cliente. Ai vamos injetar dentro da api, cliente
  }

  public goBancoPage(){
    if(this.bancoPage === true){
      this.router.navigate(['banco-page'])
    }
  }
}
