import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private dados: any;

  constructor() { }

  setDados(data: any){
    this.dados = data;
  }

  getDados(){
    return this.dados;
  }
}
