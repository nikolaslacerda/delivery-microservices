import {Component, OnInit} from '@angular/core';
import {PaymentMethodService} from '../../services/payment-method.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {

  isLoading = true;
  restaurantPaymentMethods: any = [];
  allPaymentMethods: any = [];

  constructor(private paymentMethodService: PaymentMethodService, public toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.paymentMethodService.getRestaurantPaymentMethods(1)
      .subscribe(restaurantPaymentMethods => {
        this.restaurantPaymentMethods = restaurantPaymentMethods;
        this.paymentMethodService.getAllPaymentMethods().subscribe(allPaymentMethods => {
          this.delay(1000).then(() => {
            this.allPaymentMethods = allPaymentMethods.filter((x: any) => this.restaurantHavent(x));
            this.isLoading = false;
          });
        });
      });
  }

  restaurantHavent(x: any): boolean {
    return this.restaurantPaymentMethods.filter((pm: any) => pm.paymentMethod.name === x.name).length === 0;
  }

  onChange(event: any): void {
    const paymentMethodId: number = Number(event.target.value);
    const paymentMethodName = event.target.options[event.target.options.selectedIndex].text;
    this.paymentMethodService.createRestaurantPaymentMethod(paymentMethodId, 1).subscribe(
      createdPaymentMethod => {
        createdPaymentMethod.paymentMethod = {id: paymentMethodId, name: paymentMethodName};
        this.restaurantPaymentMethods.push(createdPaymentMethod);
        this.allPaymentMethods = this.allPaymentMethods.filter((x: any) => x.id !== paymentMethodId);
        this.showSuccessCreate(paymentMethodName);
      }
    );
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  deletePaymentMethod(paymentMethod: any): void {
    this.paymentMethodService.deleteRestaurantPaymentMethod(paymentMethod.id).subscribe(
      () => {
        this.restaurantPaymentMethods = this.restaurantPaymentMethods
          .filter((restaurantPaymentMethod: any) => restaurantPaymentMethod.paymentMethodId !== paymentMethod.paymentMethodId);
        this.allPaymentMethods.push(paymentMethod.paymentMethod);
        this.showSuccessDelete(paymentMethod.paymentMethod.name);
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
