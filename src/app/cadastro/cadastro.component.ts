import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import Cliente from './model/cliente';
import ClienteController from './controller/clienteController';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import ICliente from './model/iCliente';

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
  idCliente!: string;
  nomeCliente!: string | undefined;

  constructor(private clienteService: ClienteService, 
              private router: Router,
              private databaseService: DatabaseService,       ){
  }

  adicionarCliente(frmCadastro: NgForm){
    this.clienteService.adicionarCliente(this.cliente).subscribe(novo => {});
      this.idCliente = this.cliente.id;
      this.cliente = ClienteController.newCliente(); //Limpar o cadastro. (proavavelmente vou mudar isso aqui)
      frmCadastro.reset();
    
    this.clienteService.bancoPage = true;
    this.clienteService.goBancoPage();
    this.clienteService.navbar = !this.clienteService.navbar;

    this.encontraCliente(this.idCliente);
  }


  encontraCliente(id: string){
    this.databaseService.getClientes().subscribe((clientes: ICliente[]) => {
        let cliente = clientes.find((c: ICliente) => c.id === id)
        this.nomeCliente = cliente?.nome

        this.passarDados()
    })
  }

  passarDados(){
    this.router.navigate(['/banco-page'], {queryParams: {"nomeCliente": this.nomeCliente}})
  }


}

//Iniciar json:server - json-server --watch src/db.json --port 3000