import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';

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

}
