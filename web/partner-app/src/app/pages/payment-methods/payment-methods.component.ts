import {Component, OnInit} from '@angular/core';
import {PaymentMethodService} from '../../services/payment-method.service';
import {ToastrService} from 'ngx-toastr';
import {PaymentMethodResponse} from '../../model/payment-method-response.model';
import {AuthService} from '../../services/auth.service';

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
    const paymentMethodId: number = Number(event.target.value);
    const paymentMethodName = event.target.options[event.target.options.selectedIndex].text;
    this.paymentMethodService.addPaymentMethodToRestaurant(paymentMethodId, 1).subscribe(
      createdPaymentMethod => {
        this.restaurantPaymentMethods.push(new PaymentMethodResponse({
          id: createdPaymentMethod.id,
          paymentMethodId,
          name: paymentMethodName
        }));
        this.allPaymentMethods = this.allPaymentMethods.filter((x: any) => x.paymentMethodId !== paymentMethodId);
        this.showSuccessCreate(paymentMethodName);
      }
    );
  }

  deletePaymentMethod(paymentMethod: any): void {
    this.paymentMethodService.deleteRestaurantPaymentMethod(paymentMethod.id).subscribe(
      () => {
        this.restaurantPaymentMethods = this.restaurantPaymentMethods
          .filter((restaurantPaymentMethod: any) => restaurantPaymentMethod.paymentMethodId !== paymentMethod.paymentMethodId);
        this.allPaymentMethods.push(new PaymentMethodResponse({paymentMethodId: paymentMethod.paymentMethodId, name: paymentMethod.name}));
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
