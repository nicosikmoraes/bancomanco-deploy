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


@Component({
  selector: 'app-banco-page',
  imports: [FormsModule,
            CommonModule,
            NgxMaskDirective,
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

  constructor( 
      private shareDataService: ShareDataService,
      private clienteService: ClienteService,
      private transitionService: TransitionsService,
  ){}

  ngOnInit(): void {
      this.dados = this.shareDataService.getDados();
      this.getHistoric();

      console.log("TransitionData: ",this.transitionsData);

      // Estou passando o id do cliente para o transition;
      this.transition = TransitionController.newTransition(this.dados.id);
      console.log(this.dados);
    }

    updateDatabase(){
        const id = this.dados.id;
        const dadosParcial = {saldo: this.dados.saldo}
      
        //Update Database
      this.clienteService.atualizarCliente(id, dadosParcial).subscribe({
          next: res => console.log('Usuário atualizado:', res),
          error: err => console.error('Erro ao atualizar:', err)
    });
    }

  add1000(){
    this.dados.saldo = this.dados.saldo + 1000;
      this.updateDatabase();
  }


    sub1000(){
      if((this.dados.saldo - 1000) >= 0){
             this.dados.saldo = this.dados.saldo - 1000;
               this.updateDatabase();
      }else{
        alert("Sem saldo suficiente")
      }
  }

  deposito(){
    this.dados.saldo = this.dados.saldo + this.valorDeposito;
    console.log(this.dados.saldo, "valor Depositado: ", this.valorDeposito);
    this.updateDatabase();

    this.transition.message = `Recebimento: +R$${this.valorDeposito}`;
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
    this.updateDatabase();

    this.transition.message = `Pagamento: -R$${this.valorSaque}`;
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


  getHistoric(){
    this.transitionService.getTransitions().subscribe((historico: ITransitions[]) =>{
      const filtrado = historico.filter((t: ITransitions) => t.id === this.dados.id);
      this.transitionsData = filtrado;
      this.lastThreeTransitions = filtrado.slice(-3);
    })
  }

}
