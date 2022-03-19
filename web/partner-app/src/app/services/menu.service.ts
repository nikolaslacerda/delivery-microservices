import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {MenuResponse} from '../model/menu-response.model';
import {MenuCategoryResponse} from '../model/menu-category-response.model';
import {MenuItemResponse} from '../model/menu-item-response.model';
import {MenuCategoryRequest} from '../model/menu-category-request.model';
import {MenuItemRequest} from '../model/menu-item-request.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getMenuByRestaurant(restaurantId: number): Observable<MenuResponse[]> {
    return this.http.get<MenuResponse[]>(`${this.API}/menus?restaurantId=${restaurantId}`);
  }

  getCategoriesByMenu(menuId: number): Observable<MenuCategoryResponse[]> {
    return this.http.get<MenuCategoryResponse[]>(`${this.API}/menuCategories?menuId=${menuId}`);
  }

  getItemsByCategory(categoryId: number): Observable<MenuItemResponse[]> {
    return this.http.get<MenuItemResponse[]>(`${this.API}/menuItems?menuCategoryId=${categoryId}`);
  }

  addMenuCategory(category: MenuCategoryRequest): Observable<MenuCategoryResponse> {
    return this.http.post<MenuCategoryResponse>(`${this.API}/menuCategories`, category);
  }

  addMenuItem(menuItem: MenuItemRequest): Observable<MenuItemResponse> {
    return this.http.post<MenuItemResponse>(`${this.API}/menuItems`, menuItem);
  }

  addMenuItemImage(menuItemId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.API}/menuItems/${menuItemId}/update-image`, formData);
  }

  updateMenuItem(menuItemId: number, menuItem: MenuItemRequest): Observable<MenuItemResponse> {
    return this.http.patch<MenuItemResponse>(`${this.API}/menuItems/${menuItemId}`, menuItem);
  }

  updateMenuCategory(menuCategoryId: number, menuCategory: MenuCategoryRequest): Observable<MenuCategoryResponse> {
    return this.http.put<MenuCategoryResponse>(`${this.API}/menuCategories/${menuCategoryId}`, menuCategory);
  }

  deleteMenuItem(menuItem: MenuItemResponse): Observable<void> {
    return this.http.delete<void>(`${this.API}/menuItems/${menuItem.id}`);
  }

  getMenuItemById(menuId: number): Observable<MenuItemResponse> {
    return this.http.get<MenuItemResponse>(`${this.API}/menuItems/${menuId}`);
  }

  updateItemStatus(item: MenuItemResponse): Observable<void> {
    return this.http.put<void>(`${this.API}/menuItems/${item.id}`, item);
  }

  getCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.API}/menuCategories/${categoryId}`);
  }

  updateCategoryStatus(category: MenuCategoryResponse): Observable<void> {
    return this.http.put<void>(`${this.API}/menuCategories/${category.id}`, category);
  }

  deleteMenuCategory(category: MenuCategoryResponse): Observable<void> {
    return this.http.delete<void>(`${this.API}/menuCategories/${category.id}`);
  }
}
