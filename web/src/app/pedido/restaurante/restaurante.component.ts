import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {RestauranteService} from 'src/app/services/restaurante.service';
import {CardapioService} from 'src/app/services/cardapio.service';
import {AvaliacoesService} from 'src/app/services/avaliacoes.service';
import {PedidosService} from 'src/app/services/pedidos.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Review} from '../../models/review';
import {RestaurantWithDistance} from '../../models/restaurant-with-distance';
import {Menu} from '../../models/menu';
import {Order} from '../../models/order';
import {OrderItem} from '../../models/order-item';
import {Client} from '../../models/client';
import {MenuItem} from '../../models/menu-item';
import {Delivery} from '../../models/delivery';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html'
})
export class RestauranteComponent implements OnInit {

  cep: string;
  menu: Menu;
  order: Order = {
    items: [],
    delivery: {} as Delivery
  } as Order;
  reviews: Array<Review> = [];
  restaurant: RestaurantWithDistance;

  itemChosen: OrderItem = {} as OrderItem;
  addOrderItem = false;

  menuItemModal: NgbModalRef;
  deliveryOrderModel: NgbModalRef;

  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  phoneMask = userInput => {
    const numbers = userInput.match(/\d/g);
    let numberLength = 0;
    if (numbers) {
      numberLength = numbers.join('').length;
    }
    if (numberLength > 10) {
      return ['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    } else {
      return ['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }
  };

  constructor(private modal: NgbModal,
              private route: ActivatedRoute,
              private router: Router,
              private restaurantService: RestauranteService,
              private menuService: CardapioService,
              private reviewService: AvaliacoesService,
              private orderService: PedidosService) {
  }

  ngOnInit() {
    this.cep = this.route.snapshot.params.cep;
    const restaurantId = this.route.snapshot.params.restauranteId;

    this.restaurantService.getRestaurantWithDistance(this.cep, restaurantId)
      .subscribe(restaurant => {
        this.restaurant = restaurant;
        this.order.restaurantId = restaurant.id;
        this.reviewService.getByRestaurant(restaurantId)
          .subscribe(reviews => {
            this.reviews = reviews;
            this.restaurant.reviewAverage = reviews.reduce((acc, cur) => acc + cur.score, 0) / reviews.length;
          });
      });

    this.menuService
      .getByRestaurant(restaurantId)
      .subscribe(menu => this.menu = menu);
  }

  chooseMenuItem(modal, menuItem: MenuItem) {
    const index = this.order.items.findIndex(i => i.menuItemId === menuItem.id);
    if (index < 0) {
      this.itemChosen.menuItemId = menuItem.id;
      this.itemChosen.price = menuItem.price;
      this.itemChosen.promotionalPrice = menuItem.promotionalPrice;
      this.itemChosen.name = menuItem.name;
      this.itemChosen.quantity = 1;
      this.addOrderItem = true;
    } else {
      this.itemChosen = Object.assign({}, this.order.items[index]);
    }
    this.menuItemModal = this.modal.open(modal);
  }

  selectMenuItem() {
    if (this.addOrderItem) {
      this.order.items.push(this.itemChosen);
    } else if (this.itemChosen) {
      const index = this.order.items.findIndex(i => i.menuItemId === this.itemChosen.menuItemId);
      this.order.items[index] = this.itemChosen;
    }
    this.itemChosen = {} as OrderItem;
    this.addOrderItem = false;
    this.menuItemModal.close();
  }

  updateMenuItem(modal, orderItem: OrderItem) {
    this.itemChosen = Object.assign({}, orderItem);
    this.menuItemModal = this.modal.open(modal);
  }

  deleteMenuItem(orderItem: OrderItem) {
    this.order.items = this.order.items.filter(i => i.menuItemId !== orderItem.menuItemId);
    this.itemChosen = {} as OrderItem;
    this.addOrderItem = false;
  }

  getSubtotal(orderItem: OrderItem) {
    const menuItem = this.order.items.find(i => i.menuItemId === orderItem.menuItemId);
    const price = menuItem.promotionalPrice || menuItem.price;
    return orderItem.quantity * price;
  }

  getOrderPrice() {
    let total = this.restaurant.deliveryPrice || 0;
    this.order.items.forEach(item => {
      total += this.getSubtotal(item);
    });
    return total;
  }

  finishOrder(modal) {
    this.order.restaurantId = this.restaurant.id;
    this.order.delivery.cep = this.cep;
    this.order.delivery.client = {} as Client;
    this.deliveryOrderModel = this.modal.open(modal);
  }

  finishDelivery() {
    console.log(this.order);
    this.orderService.createOrder(this.order)
      .subscribe(order => {
        this.router.navigateByUrl(`orders/${order.id}/payment`);
        this.deliveryOrderModel.close();
      });

  }

}
