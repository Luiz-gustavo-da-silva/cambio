import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CambioService } from '../../core/services/cambio.service';
import { ObjCambio } from '../../core/models/cambio-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public objCambio: ObjCambio = {
    success: false,
    timestamp: 0,
    base: '',
    date: '',
    rates: {},
  };

  public moedas!: string[];
  public moedaOrigem: string = 'BRL';
  public valorOrigem: number = 1;
  public moedaDestino: string = 'BRL';
  public valorDestino: number = 1;

  constructor(readonly cambioService: CambioService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.cambioService.findAll().subscribe({
      next: (response) => {
        this.objCambio = response;
        this.moedas = Object.keys(this.objCambio.rates);
      },
      error: (err) => {
        console.error('Erro ao buscar os cambios:', err);
      },
    });
  }

  calculationCambio() {
    if (this.objCambio && this.objCambio.rates) {
      const taxaOrigem = this.objCambio.rates[this.moedaOrigem];
      const taxaDestino = this.objCambio.rates[this.moedaDestino];

      if (taxaOrigem && taxaDestino) {
        this.valorDestino = (this.valorOrigem * taxaDestino) / taxaOrigem;
      } else {
        console.error(
          'Taxa de câmbio não encontrada para as moedas selecionadas.'
        );
      }
    } else {
      console.error('Dados de câmbio não disponíveis.');
    }
  }

  inversorCambio() {
    const tempMoeda = this.moedaOrigem;
    this.moedaOrigem = this.moedaDestino;
    this.moedaDestino = tempMoeda;

    const tempValor = this.valorOrigem;
    this.valorOrigem = this.valorDestino;
    this.valorDestino = tempValor;

    this.calculationCambio();
  }

  getFirstLetter(l: string): string{
   return l ? l[0] : "-";
  }
}
