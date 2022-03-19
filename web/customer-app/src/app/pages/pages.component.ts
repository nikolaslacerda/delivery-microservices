import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  user: any;

  constructor(private router: Router,
              private authService: AuthenticationService) {
    this.authService.currentUserObservable.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  goToPartnerApp(): void {
    window.open('https://www.google.com', '_blank');
  }
}
