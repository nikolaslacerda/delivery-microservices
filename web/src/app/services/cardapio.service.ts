import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {Menu} from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getByRestaurant(restaurantId: string): Observable<Menu> {
    return this.http.get<Menu>(`${this.API}/restaurants/${restaurantId}/menu`);
  }

  porId(restauranteId, cardapioId): Observable<any> {
    return this.http.get(`${this.API}/restaurants/${restauranteId}/menu/${cardapioId}`);
  }

  doRestaurante(restaurante): Observable<any> {
    return this.http.get(`${this.API}/restaurants/${restaurante.id}/menu`); // DIFERENÇA DE RESTAURANT E POR ID?
  }

  categoriaDoCardapioPorId(restauranteId, cardapioId, categoriaId): Observable<any> {
    return this.http.get(`${this.API}/restaurants/${restauranteId}/menu/${cardapioId}/category/${categoriaId}`);
  }

  adicionaCategoriaAoCardapio(categoria): Observable<any> {
    const category = categoria.cardapio;
    const restaurant = category.restaurante;
    return this.http.post(`${this.API}/partners/restaurants/${restaurant.id}/menu/${category.id}/category`, categoria);
  }

  removeItemDoCardapio(item): Observable<any> {
    const category = item.categoria;
    const menu = category.cardapio;
    const restaurant = menu.restaurante;
    return this.http.delete(`${this.API}/partners/restaurants/${restaurant.id}/menu/${menu.id}/category/${category.id}/item/${item.id}`);
  }

  itemDoCardapioPorId(restauranteId, cardapioId, categoriaId, itemId): Observable<any> {
    return this.http.get(`${this.API}/partners/restaurants/${restauranteId}/menu/${cardapioId}/category/${categoriaId}/item/${itemId}`);
  }

  salvaItemDoCardapio(item): Observable<any> {
    const category = item.categoria;
    const menu = category.cardapio;
    const restaurant = menu.restaurante;
    if (item.id) {
      return this.http.put(`${this.API}/partners/restaurants/${restaurant.id}/menu/${menu.id}/category/${category.id}/item/${item.id}`, item);
    }
    return this.http.post(`${this.API}/partners/restaurants/${restaurant.id}/menu/${menu.id}/category/${category.id}/item`, item);
  }

}
