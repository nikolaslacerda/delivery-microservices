import {Component, OnInit} from '@angular/core';
import {PaymentMethodService} from '../../core/services/payment-method.service';
import {ToastrService} from 'ngx-toastr';
import {PaymentMethodResponse} from '../../shared/model/response/payment-method-response.model';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {

  isLoading = true;
  restaurantPaymentMethods: PaymentMethodResponse[] = [];
  allPaymentMethods: PaymentMethodResponse[] = [];

  constructor(private paymentMethodService: PaymentMethodService,
              private authService: AuthService,
              public toastr: ToastrService) {
  }

  ngOnInit(): void {
    const restaurantId = this.authService.getRestaurantId();
    this.paymentMethodService.getRestaurantPaymentMethods(restaurantId)
      .subscribe((restaurantPaymentMethods: PaymentMethodResponse[]) => {
        this.restaurantPaymentMethods = restaurantPaymentMethods;
        this.paymentMethodService.getAllPaymentMethods()
          .subscribe((allPaymentMethods: PaymentMethodResponse[]) => {
            this.allPaymentMethods = allPaymentMethods.filter((x: any) => this.restaurantHavent(x));
            this.isLoading = false;
          });
      });
  }

  restaurantHavent(x: any): boolean {
    return this.restaurantPaymentMethods.filter((pm: any) => pm.name === x.name).length === 0;
  }

  onChange(event: any): void {
    console.log(this.allPaymentMethods);
    const paymentMethodId: number = Number(event.target.value);
    const paymentMethodName = event.target.options[event.target.options.selectedIndex].text;
    this.paymentMethodService.addPaymentMethodToRestaurant(paymentMethodId, 1).subscribe(
      createdPaymentMethod => {
        this.restaurantPaymentMethods.push(createdPaymentMethod);
        this.allPaymentMethods = this.allPaymentMethods.filter((x: any) => x.id !== paymentMethodId);
        this.showSuccessCreate(paymentMethodName);
      }
    );
  }

  deletePaymentMethod(paymentMethod: PaymentMethodResponse): void {
    const restaurantId = this.authService.getRestaurantId();
    this.paymentMethodService.deleteRestaurantPaymentMethod(restaurantId, paymentMethod.id).subscribe(
      () => {
        this.restaurantPaymentMethods = this.restaurantPaymentMethods
          .filter((restaurantPaymentMethod: any) => restaurantPaymentMethod.id !== paymentMethod.id);
        this.allPaymentMethods.push(paymentMethod);
        this.showSuccessDelete(paymentMethod.name);
      }
    );
  }

  showSuccessCreate(paymentMethodName: string): void {
    this.toastr.success('Adicionado o método de pagamento ' + paymentMethodName + ' para o restaurante', 'Sucesso', {
      timeOut: 3000,
    });
  }

  showSuccessDelete(paymentMethodName: string): void {
    this.toastr.success('Removido o método de pagamento ' + paymentMethodName + ' para o restaurante', 'Sucesso', {
      timeOut: 3000,
    });
  }
}
