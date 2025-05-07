import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BancoPageComponent } from './banco-page/banco-page.component';

export const routes: Routes = [
    {path: 'cadastro', component: CadastroComponent},
    {path: 'home-page', component: HomePageComponent},
    {path: 'banco-page', component: BancoPageComponent},
];
