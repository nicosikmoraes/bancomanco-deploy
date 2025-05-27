import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ITransitions from '../interface/ITransitions';
import { ShareDataService } from './share-data.service';

@Injectable({
  providedIn: 'root'
})

export class TransitionsService {
    Transition!: string;
    private api: string = 'http://localhost:3000/pagamentos';
    clientTransition: any[] = [];

  constructor(private http: HttpClient,

  )
   { }

    public getTransitions(): Observable<any[]>{
        return this.http.get<any[]>(this.api);
      }

    public addTransition(transition: ITransitions): Observable<ITransitions> {
          return this.http.post<ITransitions>(this.api, transition); // O <Cliente> significa que faz uma requisição do tipo POST e espera que a resposta seja do tipo Cliente. Ai vamos injetar dentro da api, cliente
     }

  }