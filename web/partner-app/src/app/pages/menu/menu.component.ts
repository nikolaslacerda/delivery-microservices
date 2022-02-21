import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuService} from '../../services/menu.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoading = true;
  menu: any;

  constructor(private menuService: MenuService,
              private route: ActivatedRoute,
              public toastr: ToastrService) {
  }

  ngOnInit(): void {
    const restaurantId = 1;

    this.menuService.getMenuByRestaurant(restaurantId)
      .subscribe(menu => {
        this.delay(1000).then(() => {
          this.isLoading = false;
          this.menu = menu[0];
        });
      });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }
}
