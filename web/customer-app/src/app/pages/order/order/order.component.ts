import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from 'src/app/core/services/order.service';
import {OrderRequest} from '../../../shared/models/request/order.request.model';
import {CartItem} from '../../../shared/models/cart-item';
import {OrderItemRequest} from '../../../shared/models/request/order-item.request';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {RestaurantService} from '../../../core/services/restaurant.service';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {PaymentMethodService} from '../../../core/services/payment-method.service';
import {ShoppingCartService} from '../../../core/services/shopping-cart.service';
import {AddressRequest} from '../../../shared/models/request/address.request.model';
import {PaymentRequest} from '../../../shared/models/request/payment.request.model';
import {RestaurantResponse} from '../../../shared/models/response/restaurant.response.model';
import {PaymentMethodResponse} from '../../../shared/models/response/payment-method.response';
import {RestaurantOrderRequest} from '../../../shared/models/restaurant.order.request.model';
import {DeliveryRequest} from '../../../shared/models/request/delivery.request.model';

@Component({
  selector: 'app-order-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  isLoading = true;
  order = {} as OrderRequest;
  payment = {} as PaymentRequest;
  restaurant = {} as RestaurantResponse;
  paymentMethods: PaymentMethodResponse[];

  orderForm = this.formBuilder.group({
    addressGroup: this.formBuilder.group({
      streetName: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      streetNumber: this.formBuilder.control('', [Validators.required]),
      neighborhood: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      city: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      country: this.formBuilder.control('US', [Validators.required]),
      state: this.formBuilder.control('RS', [Validators.required]),
      postalCode: this.formBuilder.control('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      complement: this.formBuilder.control(''),
      reference: this.formBuilder.control('')
    }),
    paymentGroup: this.formBuilder.group({
      paymentId: this.formBuilder.control('', [Validators.required])
    })
  });

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private orderService: OrderService,
              private shoppingCard: ShoppingCartService,
              private authService: AuthenticationService,
              private restaurantService: RestaurantService,
              private paymentMethodService: PaymentMethodService,) {
  }

  ngOnInit() {
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

  get streetName(): AbstractControl {
    return this.orderForm.get('addressGroup').get('streetName');
  }

  get streetNumber(): AbstractControl {
    return this.orderForm.get('addressGroup').get('streetNumber');
  }

  get neighborhood(): AbstractControl {
    return this.orderForm.get('addressGroup').get('neighborhood');
  }

  get city(): AbstractControl {
    return this.orderForm.get('addressGroup').get('city');
  }

  get postalCode(): AbstractControl {
    return this.orderForm.get('addressGroup').get('postalCode');
  }

  get complement(): AbstractControl {
    return this.orderForm.get('addressGroup').get('complement');
  }

  get reference(): AbstractControl {
    return this.orderForm.get('addressGroup').get('reference');
  }

  cartItems(): CartItem[] {
    return this.shoppingCard.getCartItems;
  }

  increaseQty(item: CartItem): void {
    this.shoppingCard.increaseQty(item);
  }

  decreaseQty(item: CartItem): void {
    this.shoppingCard.decreaseQty(item);
    if (this.shoppingCard.getCartItems.length === 0) {
      this.router.navigateByUrl('/');
    }
  }

  remove(item: CartItem): void {
    this.shoppingCard.removeItem(item);
    if (this.shoppingCard.getCartItems.length === 0) {
      this.router.navigateByUrl('/');
    }
  }

  getOrderTotalValue(): number {
    return this.shoppingCard.subtotal();
  }

  submitOrder(): void {
    this.order.customerId = this.authService.getCurrentUser.id;
    this.order.restaurant = new RestaurantOrderRequest(this.restaurant);
    this.order.delivery = new DeliveryRequest({address: new AddressRequest(this.orderForm.controls.addressGroup.value)});
    this.order.payment = new PaymentRequest(this.orderForm.controls.paymentGroup.value);
    this.order.items = this.cartItems().map((item: CartItem) => new OrderItemRequest(item));
    this.order.subtotal = this.shoppingCard.subtotal();
    this.order.subtotalWithDiscount = this.shoppingCard.subtotalWithDiscount();
    this.order.totalValue = this.shoppingCard.subtotal() + this.restaurant.deliveryFee;
    this.order.totalValueWithDiscount = this.shoppingCard.subtotalWithDiscount() + this.restaurant.deliveryFee;
    this.order.deliveryFee = this.restaurant.deliveryFee;
    this.orderService.createOrder(this.order).subscribe(createdOrder => {
      this.shoppingCard.clear();
      this.router.navigateByUrl(`orders/${createdOrder.id}/status`);
    });
  }
}
