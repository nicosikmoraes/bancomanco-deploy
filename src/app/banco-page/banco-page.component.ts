import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';
import { ClienteService } from '../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import Transition from './model/transition';
import TransitionController from './controller/transitionController';
import { TransitionsService } from '../services/transitions.service';
import ITransitions from '../interface/ITransitions';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import ICliente from '../cadastro/model/iCliente';


@Component({
  selector: 'app-banco-page',
  imports: [FormsModule,
            CommonModule,
            NgxMaskDirective
  ],
    providers: [provideNgxMask()],
  templateUrl: './banco-page.component.html',
  styleUrl: './banco-page.component.css'
})


export class BancoPageComponent implements OnInit{
  clienteNome!: string | undefined;
  dados: any;
  valorDeposito: number | null = null;
  valorSaque: number = 0;

  transition!: Transition;
  transitionsData: null | any[] = [];
  lastThreeTransitions: ITransitions[] = [];

  cpfTransferido: string = ''
  valorTransferido: number = 0

  constructor( 
      private shareDataService: ShareDataService,
      private clienteService: ClienteService,
      private transitionService: TransitionsService,
      private databaseService: DatabaseService,
  ){}

  ngOnInit(): void {
      this.dados = this.shareDataService.getDados();
      this.getHistoric();
      this.getHistoric();

      console.log("TransitionData: ",this.transitionsData);

      // Estou passando o id do cliente para o transition;
      this.transition = TransitionController.newTransition(this.dados.id);
      console.log(this.dados);
    }

    updateDatabase(id: string, saldo: number){
        const dadosParcial = {saldo: saldo}
      
        //Update Database
      this.clienteService.atualizarCliente(id, dadosParcial).subscribe({
          next: res => console.log('Usuário atualizado:', res),
          error: err => console.error('Erro ao atualizar:', err)
    });
    }

  add1000(){
    this.dados.saldo = this.dados.saldo + 1000;
      this.updateDatabase(this.dados.id, this.dados.saldo);
  }


    sub1000(){
      if((this.dados.saldo - 1000) >= 0){
             this.dados.saldo = this.dados.saldo - 1000;
               this.updateDatabase(this.dados.id, this.dados.saldo);
      }else{
        alert("Sem saldo suficiente")
      }
  }

  deposito(){
    this.dados.saldo = this.dados.saldo + this.valorDeposito;
    console.log(this.dados.saldo, "valor Depositado: ", this.valorDeposito);
    this.updateDatabase(this.dados.id, this.dados.saldo);

    this.transition.message = `Depositado: +R$${this.valorDeposito}`;
    this.transitionService.addTransition(this.transition).subscribe((transition) => {
      console.log(transition);
    });

    this.transition = TransitionController.newTransition(this.dados.id);
    this.valorDeposito = null;

        //Atualizando o histórico
        this.getHistoric();
        this.getHistoric();
  };

  saque(){

    if((this.dados.saldo - this.valorSaque) < 0){
      alert("Saldo insuficiente");
      this.valorSaque = 0;
    }else{

    this.dados.saldo = this.dados.saldo - this.valorSaque;
    console.log(this.dados.saldo, "Valor Sacado: ", this.valorSaque);
    this.updateDatabase(this.dados.id, this.dados.saldo);

    this.transition.message = `Sacado: -R$${this.valorSaque}`;
    this.transitionService.addTransition(this.transition).subscribe((transition) => {
      console.log(transition);
    });

    this.transition = TransitionController.newTransition(this.dados.id);

    this.valorSaque = 0;

        //Atualizando o históric
        this.getHistoric();
        this.getHistoric();
    } 
  };

  transferir(frm: NgForm){  
    if(this.dados.saldo < this.valorTransferido){
      alert("Saldo Insuficiente")
    } else {
      this.getTransferirConta(this.cpfTransferido, this.valorTransferido)
    }

    this.cpfTransferido = '';
    this.valorTransferido = 0;

    frm.reset()
  }

  getTransferirConta(cpf: string, valor: number){
      this.databaseService.getClientes().subscribe((clientes: ICliente[]) => {
      const contaEncontrada = clientes.find((c: ICliente) => c.cpf === cpf);

      if(!contaEncontrada){
        alert("Conta não encontrada")
      }else{
        console.log("Conta encontrada ->",contaEncontrada);

           this.dados.saldo = this.dados.saldo - valor;
           const saldoConta2 = contaEncontrada.saldo + valor;
               this.updateDatabase(this.dados.id, this.dados.saldo);
               this.updateDatabase(contaEncontrada.id, saldoConta2);

        this.transition.message = `Transferido: -R$${valor}`;
        this.transitionService.addTransition(this.transition).subscribe((transition) => {
          console.log("Mensagem Transferido",transition);
        });

        this.transition = TransitionController.newTransition(contaEncontrada.id);

        this.transition.message = `Recebido: +R$${valor}`;
        this.transitionService.addTransition(this.transition).subscribe((transition) => {
          console.log("Mensagem Recebido",transition);
        });

          this.transition = TransitionController.newTransition(this.dados.id);

            //Atualizando o históric
            this.getHistoric();
            this.getHistoric();
          }
    })
  }


  getHistoric(){
    this.transitionService.getTransitions().subscribe((historico: ITransitions[]) =>{
      const filtrado = historico.filter((t: ITransitions) => t.id === this.dados.id);
      this.transitionsData = filtrado;
      this.lastThreeTransitions = filtrado.slice(-3);
      console.log("GET HISTORIC")
    })
  }

}
