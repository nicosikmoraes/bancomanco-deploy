import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banco-page',
  imports: [],
  templateUrl: './banco-page.component.html',
  styleUrl: './banco-page.component.css'
})
export class BancoPageComponent implements OnInit{
  clienteNome!: string | undefined;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params']
      this.clienteNome = params['nomeCliente'];
      console.log(this.clienteNome);
    })
  }

}
