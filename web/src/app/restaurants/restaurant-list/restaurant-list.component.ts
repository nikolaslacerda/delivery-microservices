import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CuisineTypeService} from 'src/app/services/cuisine-type.service';
import {RestauranteService} from 'src/app/services/restaurante.service';
import {AvaliacoesService} from 'src/app/services/avaliacoes.service';
import {Restaurant} from '../../models/restaurant';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html'
})
export class RestaurantListComponent implements OnInit {

  cep: string;
  cuisineTypes: Array<any>;
  mainCategory: string;
  distancias: Array<any>;
  restaurantesMaisProximos: Array<any>;
  restaurantesComDetalhes: Array<any>;
  nearestRestaurantsTst: Restaurant[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cuisineTypeService: CuisineTypeService,
              private restaurantesService: RestauranteService,
              private avaliacoesService: AvaliacoesService) {
  }

  ngOnInit() {
    this.cep = this.route.snapshot.params.cep;

    this.cuisineTypeService.getCuisineTypes().subscribe(cuisineTypes => {
      this.cuisineTypes = cuisineTypes;
    });

    this.route.queryParams.subscribe(queryParams => {
      console.log(queryParams);
      this.mainCategory = queryParams.mainCategory;
      this.getFeedRestaurants();
    });
  }

  getFeedRestaurants() {

    if (this.mainCategory) {
      this.restaurantesService.getNearestRestaurantsByCategory(this.cep, this.mainCategory).subscribe(restaurants => {
        this.nearestRestaurantsTst = restaurants;
      });
    } else {
      this.restaurantesService.getNearestRestaurants(this.cep).subscribe(restaurants => {
        this.nearestRestaurantsTst = restaurants;
      });
    }
    // let observableMaisProximos: Observable<any>;
    // if (this.tipoDeCozinhaId) {
    //   observableMaisProximos = this.restaurantesService.getNearestRestaurantsByCuisineType(this.cep, this.tipoDeCozinhaId);
    // } else {
    //    = this.restaurantesService.getNearestRestaurants(this.cep);
    // }
    //
    // observableMaisProximos.subscribe(restaurantesMaisProximos => {
    //   this.restaurantesMaisProximos = restaurantesMaisProximos;
    //   this.obtemDetalhesDosRestaurantes();
    // });
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
}
