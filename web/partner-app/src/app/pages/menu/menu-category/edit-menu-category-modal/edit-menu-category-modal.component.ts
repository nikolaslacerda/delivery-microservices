import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {MenuService} from '../../../../core/services/menu.service';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-menu-category-modal',
  templateUrl: './edit-menu-category-modal.component.html',
  styleUrls: ['./edit-menu-category-modal.component.css']
})
export class EditMenuCategoryModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  buttonLoading = false;
  list: any[] = [];

  categoryForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-z ]*$/)]],
  });

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              public bsModalRef: BsModalRef) {
  }

  get name(): AbstractControl {
    // @ts-ignore
    return this.categoryForm.get('name');
  }

  ngOnInit(): void {
    this.populateForm();
  }

  private populateForm(): void {
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
    this.buttonLoading = true;
    this.list[0].category.name = this.categoryForm.value.name;
    this.menuService.editCategory(1, 1, this.list[0].category.id, this.list[0].category).subscribe(() => {
      this.emitAdd();
      this.hide();
    });
  }

}
