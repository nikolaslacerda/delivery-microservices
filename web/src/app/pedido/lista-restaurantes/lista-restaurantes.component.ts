import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { TipoDeCozinhaService } from 'src/app/services/tipo-de-cozinha.service';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { AvaliacoesService } from 'src/app/services/avaliacoes.service';

@Component({
  selector: 'app-lista-restaurantes',
  templateUrl: './lista-restaurantes.component.html'
})
export class ListaRestaurantesComponent implements OnInit {

  tiposDeCozinha: Array<any>;
  cep: string;
  tipoDeCozinhaId: string;
  distancias: Array<any>;
  restaurantesMaisProximos: Array<any>;
  restaurantesComDetalhes: Array<any>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tipoDeCozinhaService: TipoDeCozinhaService,
              private restaurantesService: RestauranteService,
              private avaliacoesService: AvaliacoesService) {
  }

  ngOnInit() {
    this.tipoDeCozinhaService.getCuisineTypes().subscribe(tipos => {
      this.tiposDeCozinha = tipos;
    });

    this.route.params.subscribe(params => {
      this.cep = params.cep;
      if (this.cep) {
        this.tipoDeCozinhaId = params.tipoDeCozinhaId;
        this.obtemRestaurantesMaisProximos();
      }
    });
  }

  obtemRestaurantesMaisProximos() {
    let observableMaisProximos: Observable<any>;
    if (this.tipoDeCozinhaId) {
      observableMaisProximos = this.restaurantesService.getNearestRestaurantsByCuisineType(this.cep, this.tipoDeCozinhaId);
    } else {
      observableMaisProximos = this.restaurantesService.getNearestRestaurants(this.cep);
    }

    observableMaisProximos.subscribe(restaurantesMaisProximos => {
      this.restaurantesMaisProximos = restaurantesMaisProximos;
      this.obtemDetalhesDosRestaurantes();
    });
  }

  obtemDetalhesDosRestaurantes() {
    const idsDosRestaurantes = this.restaurantesMaisProximos.map(maisProximo => maisProximo.restaurantId).join(',');
    this.restaurantesService.getByIds(idsDosRestaurantes)
      .subscribe(restaurantes => {
        this.restaurantesComDetalhes = restaurantes;
        this.agregaDistanciaAosDetalhesDosRestaurantes();
        this.mediaDeAvaliacoesDosRestaurantes();
      });
  }

  agregaDistanciaAosDetalhesDosRestaurantes() {
    this.restaurantesComDetalhes.forEach(restaurante => {
      const maisProximo = this.restaurantesMaisProximos.find(maisProximo => restaurante.id == maisProximo.restaurantId);
      restaurante.distance = maisProximo.distance;
    });
  }

  mediaDeAvaliacoesDosRestaurantes() {
    this.avaliacoesService.getRestaurantAverage(this.restaurantesComDetalhes)
      .subscribe(infoMedias => {
        infoMedias.forEach(infoMedia => {
          const restaurante = this.restaurantesComDetalhes.find(restaurante => restaurante.id === infoMedia.restaurantId);
          restaurante.average = infoMedia.average;
        });
      });
  }

  escolher(restaurante) {
    this.router.navigateByUrl(`/orders/${this.cep}/restaurant/${restaurante.id}`);
  }
}
