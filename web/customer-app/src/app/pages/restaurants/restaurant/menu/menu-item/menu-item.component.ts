import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuItemResponse} from '../../../../../shared/models/response/menu-item.response';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItemResponse;
  @Output() add = new EventEmitter();

  restaurantId: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.restaurantId = this.route.parent.snapshot.params.restaurantId
  }

  emitAddEvent() {
    this.menuItem.restaurantId = this.restaurantId; //
    this.add.emit(this.menuItem);
  }

}
