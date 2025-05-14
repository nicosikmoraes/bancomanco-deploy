import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShareDataService } from './share-data.service';
import ICliente from '../cadastro/model/iCliente';
import { ClienteService } from './cliente.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private api = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient, private router: Router,
              private shareDataService: ShareDataService,
              private clienteService: ClienteService
  ) {}

      //Aqui eu pego os dados do banco de dados e jogo num Observable, que depois pode ser lido com .subscribe((obejto) => {...})
    public getClientes(): Observable<any>{
      return this.http.get(this.api);
    }

      //Checando se os dados do login existem em alguma conta, passar os dados da conta para banco-page se existir.
    public checkInfo(cpf: string, senha: string){
            //Pegando informações do db.json de todos os meus clientes
         this.getClientes().subscribe((clientes: ICliente[]) => {
                    // Procuro alguem que o cpf e a senha sejam iguais a do login, se for passo todos os dados dessa conta para clienteEncontrado
                  const clienteEncontrado = clientes.find((c: ICliente) => c.cpf === cpf && c.senha === senha);

                    // Se clienteEncontrado tiver dados eu vou passar para banco-page usando o shareData para fazer o meio termo, ent eu populo uma váriavel lá que sera buscado pelo banco-page. Mais seguro.
                  if(clienteEncontrado){
                    this.shareDataService.setDados({
                           id: clienteEncontrado.id,
                           nome: clienteEncontrado.nome,
                           cpf: clienteEncontrado.cpf,
                           dataNascimento: clienteEncontrado.dataNascimento,
                           email: clienteEncontrado.email,
                           senha: clienteEncontrado.senha,
                           saldo: clienteEncontrado.saldo });

                      //Para mudar a navbar.
                    this.clienteService.bancoPage = true;

                      // Vou para banco-page                              
                    this.router.navigate(['/banco-page'])
                  }else{
                    // Resposta se não achar nenhuma conta
                  console.log("Not Found", clienteEncontrado)
                  alert("Senha ou CPF incorretos!")
                  }
            })
    }
   
}
