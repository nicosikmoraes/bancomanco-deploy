import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';
import { ClienteService } from '../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import Transition from './model/transition';
import TransitionController from './controller/transitionController';
import { TransitionsService } from '../services/transitions.service';
import ITransitions from '../interface/ITransitions';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import ICliente from '../cadastro/model/iCliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-banco-page',
  imports: [FormsModule,
            CommonModule,
            NgxMaskDirective, CurrencyPipe
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

  /* Dados usados no histórico */
  transition!: Transition;
  transitionsData: null | any[] = [];
  lastThreeTransitions: ITransitions[] = [];

  /* Dados usados no componente de transferência */
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
          next: res => this.getHistoric(), //Atualiza o histórico de transações.
          error: err => console.error('Erro ao atualizar:', err)
    });
    }

    //Funções do 3 Pontos da carteira.
  add1000(){
    this.dados.saldo = this.dados.saldo + 1000;
      this.updateDatabase(this.dados.id, this.dados.saldo);
  }


    sub1000(){
      if((this.dados.saldo - 1000) >= 0){
             this.dados.saldo = this.dados.saldo - 1000;
               this.updateDatabase(this.dados.id, this.dados.saldo);
      }else{
          Swal.fire({
            title: "Oops...",
            text: "Sem saldo suficiente",
            icon: "warning",
        });
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

  };

  saque(){

    if((this.dados.saldo - this.valorSaque) < 0){
      Swal.fire({
        title: "Oops...",
        text: "Sem saldo suficiente",
        icon: "warning",
    });
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

    } 
  };

  /* Chama a  função de tranferência */
  transferir(frm: NgForm){  
    /* Vejo se tenho saldo suficiente na minha conta para fazer a transação */
    if(this.dados.saldo < this.valorTransferido){
      Swal.fire({
        title: "Oops...",
        text: "Sem saldo suficiente",
        icon: "warning",
      });
    } else {
      this.getTransferirConta(this.cpfTransferido, this.valorTransferido)
    }

    this.cpfTransferido = '';
    this.valorTransferido = 0;

    /* Reseto o formulário */
    frm.reset()
  }

  getTransferirConta(cpf: string, valor: number){
    /* Pego a conta que o dinheiro vai ser transferido */
      this.databaseService.getClientes().subscribe((clientes: ICliente[]) => {
      const contaEncontrada = clientes.find((c: ICliente) => c.cpf === cpf);

    /* Vejo se essa conta existe para continuar */
      if(!contaEncontrada){
        Swal.fire({
          title: "Oops...",
          text: "Conta não encontrada",
          icon: "warning",
      });
      } else {
        console.log("Conta encontrada ->",contaEncontrada);

        /* Atualizo os novos valore do saldo no banco de dados, chamando o updataDatabase */
           this.dados.saldo = this.dados.saldo - valor;
           const saldoConta2 = contaEncontrada.saldo + valor;
               this.updateDatabase(this.dados.id, this.dados.saldo);
               this.updateDatabase(contaEncontrada.id, saldoConta2);

        /* Mensagem de Transferido para o histórico */
        this.transition.message = `Transferido: -R$${valor}`;
        this.transitionService.addTransition(this.transition).subscribe((transition) => {
          console.log("Mensagem Transferido",transition);
        });

        /* Crio uma nova mensagem, mas dessa vez para a conta que será transferido o dinheiro */
        this.transition = TransitionController.newTransition(contaEncontrada.id);

        /* Mensagem de recebido da outra conta */
        this.transition.message = `Recebido: +R$${valor}`;
        this.transitionService.addTransition(this.transition).subscribe((transition) => {
          console.log("Mensagem Recebido",transition);
        });

          this.transition = TransitionController.newTransition(this.dados.id);

          }
    })
  }


  // Para atualizar o histórico quando alguma transação for realizada. 
  getHistoric(){
    this.transitionService.getTransitions().subscribe((historico: ITransitions[]) =>{
      const filtrado = historico.filter((t: ITransitions) => t.id === this.dados.id);
      this.transitionsData = filtrado;
      this.lastThreeTransitions = filtrado.slice(-3);
      console.log("GET HISTORIC")
    })
  }

}
