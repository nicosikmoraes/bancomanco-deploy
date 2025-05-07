import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { Router } from '@angular/router';
import { ClienteService } from './services/cliente.service';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'bancomanco';
  clientes: any[] = [];

  constructor( private clienteService: ClienteService, 
               private router: Router,
               private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.router.navigate(['/home-page']);
    this.showDatabase();
  }

  public mudarBotao(){
    this.clienteService.navbar = !this.clienteService.navbar;
    console.log(this.clienteService.navbar)
  }

  public getBancoPage(){
    return this.clienteService.bancoPage;
  }

  public getNavBar(){
    return this.clienteService.navbar
  }

  public sairHomePage(){
    this.clienteService.bancoPage = false;
  }

    //Método para mostrar banco de dados no console, e inserir ele em uma váriavel local para eu poder manusear. (Vai mudar de lugar este método, está aqui só para testes.)
  showDatabase(){
    this.databaseService.getClientes().subscribe((clientes) => {
        this.clientes = clientes;
        console.log(this.clientes)
    })
  }

}
