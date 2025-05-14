import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';
import { DatabaseService } from '../services/database.service';
import ICliente from '../cadastro/model/iCliente';
import { ShareDataService } from '../services/share-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule,
            NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor( 
       private databaseService: DatabaseService,
  ) {

  }

    //Pegando dados do formulário
  public popularLogin(form: NgForm){
    const cpf = form.value.cpf;
    const senha  = form.value.senha;
    
        //Checando informações se baterem entrar na conta
    this.databaseService.checkInfo(cpf, senha);
    form.reset();
     
   }

}
