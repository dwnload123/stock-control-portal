import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stock-control-portal';

  constructor(private primeNgConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    // utilizado para as animações
    this.primeNgConfig.ripple = true;

    this.primeNgConfig.setTranslation({
      apply: 'Aplicar',
      clear: 'Limpar'
    })
  }
}
