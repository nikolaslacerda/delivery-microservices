import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from 'src/app/services/order.service';
import {OrderRequest} from '../../../models/order/request/order.request.model';
import {Payment} from '../../../models/order/payment';
import {CartItem} from '../../../models/order/cart-item';
import {OrderItem} from '../../../models/order/order-item';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestaurantService} from '../../../services/restaurant.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {PaymentMethodService} from '../../../services/payment-method.service';
import {ShoppingCartService} from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-order-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  order = {} as OrderRequest;
  orderForm: FormGroup;
  paymentMethods: Array<any>;
  payment = {} as Payment;
  restaurant: any = {};

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
        postalCode: this.formBuilder.control('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
        complement: this.formBuilder.control('')
      }),
      paymentGroup: this.formBuilder.group({
        paymentId: this.formBuilder.control('', [Validators.required])
      })
    });

    this.restaurantService.getRestaurantById(this.shoppingCard.getRestaurant).subscribe(restaurant => {
      this.restaurant = restaurant;
      this.paymentMethodService.getRestaurantPaymentMethods(restaurant.id).subscribe(paymentMethods => {
        this.paymentMethods = paymentMethods;
      });
    });


    if (this.shoppingCard.getCartItems.length === 0) {
      this.router.navigateByUrl('/');
    }
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
    this.order.address = this.orderForm.controls.addressGroup.value;
    this.order.payment = this.orderForm.controls.paymentGroup.value;
    this.order.items = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
    this.order.status = 'RECEIVED';
    console.log(this.order);
    this.orderService.createOrder(this.order).subscribe(createdOrder => {
      this.shoppingCard.clear();
      this.router.navigateByUrl(`orders/${createdOrder.id}/status`);
    });
  }

  hasError(ngModel): boolean {
    return ngModel.invalid && (ngModel.dirty || ngModel.touched);
  }
}
