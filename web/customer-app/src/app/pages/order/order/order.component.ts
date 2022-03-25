import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from 'src/app/core/services/order.service';
import {OrderRequest} from '../../../shared/models/request/order.request.model';
import {CartItem} from '../../../shared/models/cart-item';
import {OrderItemRequest} from '../../../shared/models/request/order-item.request';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestaurantService} from '../../../core/services/restaurant.service';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {PaymentMethodService} from '../../../core/services/payment-method.service';
import {ShoppingCartService} from '../../../core/services/shopping-cart.service';
import {AddressRequest} from '../../../shared/models/request/address.request.model';
import {PaymentRequest} from '../../../shared/models/request/payment.request.model';
import {RestaurantResponse} from '../../../shared/models/response/restaurant.response.model';

@Component({
  selector: 'app-order-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  isLoading = true;
  order = {} as OrderRequest;
  orderForm: FormGroup;
  paymentMethods: Array<any>;
  payment = {} as PaymentRequest;
  restaurant = {} as RestaurantResponse;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private paymentMethodService: PaymentMethodService,
              private restaurantService: RestaurantService,
              private shoppingCard: ShoppingCartService,
              private formBuilder: FormBuilder,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      addressGroup: this.formBuilder.group({
        streetAddress: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        streetNumber: this.formBuilder.control('', [Validators.required]),
        neighborhood: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        city: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
        country: this.formBuilder.control('US', [Validators.required]),
        postalCode: this.formBuilder.control('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
        complement: this.formBuilder.control(''),
        reference: this.formBuilder.control('')
      }),
      paymentGroup: this.formBuilder.group({
        paymentId: this.formBuilder.control('', [Validators.required])
      })
    });
    if (this.shoppingCard.getCartItems.length === 0) {
      this.router.navigateByUrl('/');
    } else {
      if (this.shoppingCard.getRestaurant) {
        this.restaurantService.getRestaurantById(this.shoppingCard.getRestaurant).subscribe(restaurant => {
          this.restaurant = restaurant;
          this.paymentMethodService.getRestaurantPaymentMethods(restaurant.id).subscribe(paymentMethods => {
            this.paymentMethods = paymentMethods;
            this.isLoading = false;
          });
        });
      }
    }
  }

  get streetAddress(): any {
    return this.orderForm.get('addressGroup').get('streetAddress');
  }

  get streetNumber(): any {
    return this.orderForm.get('addressGroup').get('streetNumber');
  }

  get neighborhood(): any {
    return this.orderForm.get('addressGroup').get('neighborhood');
  }

  get city(): any {
    return this.orderForm.get('addressGroup').get('city');
  }

  get postalCode(): any {
    return this.orderForm.get('addressGroup').get('postalCode');
  }

  get complement(): any {
    return this.orderForm.get('addressGroup').get('complement');
  }

  get reference(): any {
    return this.orderForm.get('addressGroup').get('reference');
  }

  cartItems() {
    return this.shoppingCard.getCartItems;
  }

  increaseQty(item: CartItem) {
    this.shoppingCard.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.shoppingCard.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.shoppingCard.removeItem(item);
    if (this.shoppingCard.getCartItems.length === 0) {
      this.router.navigateByUrl('/');
    }
  }

  itemsValue() {
    return this.shoppingCard.total();
  }

  checkOrder() {
    this.order.customerId = this.authService.getCurrentUser.id;
    this.order.restaurantId = this.shoppingCard.getRestaurant;
    this.order.address = new AddressRequest(this.orderForm.controls.addressGroup.value);
    this.order.payment = new PaymentRequest(this.orderForm.controls.paymentGroup.value);
    this.order.items = this.cartItems().map((item: CartItem) => new OrderItemRequest(item));
    this.order.status = 'RECEIVED';
    this.order.subtotal = this.shoppingCard.total();
    this.order.deliveryFee = this.restaurant.deliveryFee;
    this.order.total = this.shoppingCard.total() + this.restaurant.deliveryFee;
    this.orderService.createOrder(this.order).subscribe(createdOrder => {
      this.shoppingCard.clear();
      this.router.navigateByUrl(`orders/${createdOrder.id}/status`);
    });
  }
}
