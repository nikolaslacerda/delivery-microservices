import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  restaurant: any;
  loading = true;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getRestaurantInfo().subscribe(restaurant => {
      this.restaurant = restaurant;
      this.loading = false;
    });
  }

  onSignOut(): void {
    this.authService.signOut();
  }
}
