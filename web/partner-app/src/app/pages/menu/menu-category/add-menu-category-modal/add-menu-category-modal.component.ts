import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {MenuService} from '../../../../core/services/menu.service';
import {MenuCategoryRequest} from '../../../../shared/model/request/menu-category-request.model';
import {MenuCategoryResponse} from '../../../../shared/model/response/menu-category-response.model';

@Component({
  selector: 'app-add-menu-category-modal',
  templateUrl: './add-menu-category-modal.component.html',
  styleUrls: ['./add-menu-category-modal.component.css']
})
export class AddMenuCategoryModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  buttonLoading = false;
  category = {} as MenuCategoryResponse;
  list: any[] = [];

  categoryForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-z ]*$/)]],
    menuId: ['']
  });

  constructor(private fb: FormBuilder,
              public bsModalRef: BsModalRef,
              private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.populateForm();
  }

  get name(): AbstractControl {
    // @ts-ignore
    return this.categoryForm.get('name');
  }

  private populateForm(): void {
    this.categoryForm.patchValue({
      menuId: this.list[0].menu.id
    });
  }

  emitAdd(item: any): void {
    this.event.emit(item);
  }

  public hide(): void {
    this.bsModalRef.hide();
  }

  addCategory(): void {
    this.buttonLoading = true;
    const category = new MenuCategoryRequest(this.categoryForm.value);
    this.menuService.createCategory(1, 1, category).subscribe(createdCategory => {
      this.emitAdd(createdCategory);
      this.hide();
    });
  }

}
