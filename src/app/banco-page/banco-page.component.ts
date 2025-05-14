import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareDataService } from '../services/share-data.service';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-banco-page',
  imports: [],
  templateUrl: './banco-page.component.html',
  styleUrl: './banco-page.component.css'
})
export class BancoPageComponent implements OnInit{
  clienteNome!: string | undefined;
  dados: any;

  constructor( 
      private shareDataService: ShareDataService,
      private clienteService: ClienteService
  ){}

  ngOnInit(): void {
      this.dados = this.shareDataService.getDados();
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


}
