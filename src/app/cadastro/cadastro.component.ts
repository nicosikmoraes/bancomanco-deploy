import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import Cliente from './model/cliente';
import ClienteController from './controller/clienteController';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-cadastro',
  template: `
  <input type="text" [(ngModel)]="myValue" ngModelOptions="{getterSetter: true}">
`,
  imports: [FormsModule,
            NgxMaskDirective,
            CommonModule,

  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})


export class CadastroComponent {
  cliente: Cliente = ClienteController.newCliente();

  constructor(private clienteService: ClienteService, 
              private shareDataService: ShareDataService,
              private router: Router      
  ){}


  adicionarCliente(frmCadastro: NgForm){
      //Adicionando clientes no db.json
    this.clienteService.adicionarCliente(this.cliente).subscribe(novo => {});

      //Passando dados para banco-page
    this.shareDataService.setDados({
      id: this.cliente.id,
      nome: this.cliente.nome,
      cpf: this.cliente.cpf,
      dataNascimento: this.cliente.dataNascimento,
      email: this.cliente.email,
      senha: this.cliente.senha,
      saldo: this.cliente.saldo });
      
        //Limpar o cadastro e resetar this.cliente 
      this.cliente = ClienteController.newCliente(); 
      frmCadastro.reset();

       //Para mudar a navbar.
      this.clienteService.bancoPage = true;
    
        //Mudar botão
      this.clienteService.navbar = !this.clienteService.navbar;

        //Navegar para banco-page
      this.router.navigate(['/banco-page'])


  }

}

//Iniciar json:server - json-server --watch src/db.json --port 3000