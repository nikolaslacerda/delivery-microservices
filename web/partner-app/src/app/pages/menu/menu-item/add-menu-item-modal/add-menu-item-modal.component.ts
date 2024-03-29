import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {MenuService} from '../../../../core/services/menu.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {MenuItemRequest} from '../../../../shared/model/request/menu-item-request.model';
import {MenuCategoryResponse} from '../../../../shared/model/response/menu-category-response.model';
import {MenuItemResponse} from '../../../../shared/model/response/menu-item-response.model';

@Component({
  selector: 'app-add-menu-item-modal',
  templateUrl: './add-menu-item-modal.component.html',
  styleUrls: ['./add-menu-item-modal.component.css']
})
export class AddMenuItemModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  imageSrc = '';
  image!: File;
  buttonLoading = false;
  category = {} as MenuCategoryResponse;

  addMenuItemForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-z]*$/)]],
    description: ['', Validators.required],
    promotionalPrice: ['', [Validators.required, Validators.min(0.1)]],
    price: ['', [Validators.required, Validators.min(0.1)]],
    image: this.fb.group({
      file: [''],
      fileSource: ['']
    })
  });

  constructor(private fb: FormBuilder,
              public bsModalRef: BsModalRef,
              private menuService: MenuService) {
  }

  ngOnInit(): void {
  }

  get name(): AbstractControl {
    // @ts-ignore
    return this.addMenuItemForm.get('name');
  }

  get description(): AbstractControl {
    // @ts-ignore
    return this.addMenuItemForm.get('description');
  }

  get price(): AbstractControl {
    // @ts-ignore
    return this.addMenuItemForm.get('price');
  }

  get promotionalPrice(): AbstractControl {
    // @ts-ignore
    return this.addMenuItemForm.get('promotionalPrice');
  }

  onFileChange(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file2: File = event.target.files[0];
      this.image = file2;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.addMenuItemForm.controls.image.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  emitAdd(item: any): void {
    this.event.emit(item);
  }

  public hide(): void {
    this.bsModalRef.hide();
  }

  addItem(): void {
    if (this.addMenuItemForm.valid) {
      this.buttonLoading = true;
      if (!this.addMenuItemForm.value.image.fileSource.length) {
        this.addItemWithoutImage();
      } else {
        this.addMenuItemWithImage();
      }
    }
  }

  private addMenuItemWithImage(): void {
    this.menuService.createItem(1, this.category.id, new MenuItemRequest(this.addMenuItemForm.value))
      .subscribe((menuItem: MenuItemResponse) => {
        this.menuService.addMenuItemImage(menuItem.id, this.image)
          .subscribe(_ => {
            this.emitAdd(menuItem);
            this.hide();
          });
      });
  }

  private addItemWithoutImage(): void {
    this.menuService.createItem(1, this.category.id, new MenuItemRequest(this.addMenuItemForm.value))
      .subscribe((menuItem: MenuItemResponse) => {
        this.emitAdd(menuItem);
        this.hide();
      });
  }
}
