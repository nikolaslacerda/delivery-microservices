import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MenuService} from '../../../../services/menu.service';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-menu-category-modal',
  templateUrl: './edit-menu-category-modal.component.html',
  styleUrls: ['./edit-menu-category-modal.component.css']
})
export class EditMenuCategoryModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  categoryForm = this.fb.group({
    name: ['', Validators.required],
  });
  list: any[] = [];

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this._populateForm();
  }

  private _populateForm(): void {
    this.categoryForm.patchValue({
      name: this.list[0].category.name
    });
  }

  emitAdd(): void {
    this.event.emit();
  }

  public hide(): void {
    this.bsModalRef.hide();
  }

  updateMenuCategory(): void {
    this.list[0].category.name = this.categoryForm.value.name;
    this.menuService.editCategory(1, 1, this.list[0].category.id, this.list[0].category).subscribe(() => {
      this.emitAdd();
      this.hide();
    });
  }

}
