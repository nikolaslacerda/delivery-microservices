import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-change-restaurant-modal',
  templateUrl: './change-restaurant-modal.component.html',
  styleUrls: ['./change-restaurant-modal.component.css']
})
export class ChangeRestaurantModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  emitChangeRestaurant(): void {
    this.event.emit();
    this.hide();
  }

  public hide(): void {
    this.bsModalRef.hide();
  }

}
