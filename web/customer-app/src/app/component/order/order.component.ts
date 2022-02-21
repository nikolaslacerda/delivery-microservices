import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './order.component.html'
})
export class OrderComponent {
  cep: string;

  constructor(private router: Router) { }

  buscar() {
    this.router.navigate(['/restaurants/', this.cep]);
  }
}
