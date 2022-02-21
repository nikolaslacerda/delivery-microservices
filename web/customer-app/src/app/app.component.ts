import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: any;

  constructor(private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

}
