import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Cliente from '../cadastro/model/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private api = 'http://localhost:3000/clientes'; // Link do meu "banco de dados"
  public bancoPage: boolean = false;
  public navbar: boolean = true;

  constructor(private http: HttpClient) { } // Serve para poder usar GET, POST, etc...

  public adicionarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.api, cliente); // O <Cliente> significa que faz uma requisição do tipo POST e espera que a resposta seja do tipo Cliente. Ai vamos injetar dentro da api, cliente
  }

  public atualizarCliente(id: string, dadosParciais: Partial<Cliente>): Observable<Cliente>{
    return this.http.patch<Cliente>(`${this.api}/${id}`, dadosParciais);
  }

}
