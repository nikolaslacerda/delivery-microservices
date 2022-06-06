import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MenuService} from '../../../../core/services/menu.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {MenuItemUpdateRequest} from '../../../../shared/model/request/menu-item-update-request.model';
import {MenuItemResponse} from '../../../../shared/model/response/menu-item-response.model';

@Component({
  selector: 'app-edit-menu-item-modal',
  templateUrl: './edit-menu-item-modal.component.html',
  styleUrls: ['./edit-menu-item-modal.component.css']
})
export class EditMenuItemModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  item = {} as MenuItemResponse;
  editMenuItemForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    promotionalPrice: ['', Validators.required],
    image: this.fb.group({
      file: [''],
      fileSource: ['']
    })
  });
  imageSrc: any;
  image!: File;
  buttonLoading = false;

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this._populateForm();
    this.imageSrc = `http://localhost:9999/restaurants/1/items/${this.item.id}/image`;
  }

  private _populateForm(): void {
    this.editMenuItemForm.patchValue({
      name: this.item.name,
      description: this.item.description,
      price: this.item.price,
      promotionalPrice: this.item.promotionalPrice
    });
  }

  public hide(): void {
    this.bsModalRef.hide();
  }

  emitUpdateItemEvent(item: any): void {
    this.event.emit(item);
  }

  updateMenuItem(): void {
    if (this.editMenuItemForm.valid) {
      this.buttonLoading = true;
      if (!this.editMenuItemForm.value.image.fileSource.length) {
        this.updateItemWithoutImage();
      } else {
        this.updateImageWithImage();
      }
    }
  }

  private updateItemWithoutImage(): void {
    this.menuService.editItem(1, 1, this.item.id, new MenuItemUpdateRequest(this.editMenuItemForm.value))
      .subscribe((menuItem: MenuItemResponse) => {
        this.buttonLoading = false;
        this.emitUpdateItemEvent(menuItem);
        this.hide();
      });
  }

  private updateImageWithImage(): void {
    this.menuService.editItem(1, 1, this.item.id, new MenuItemUpdateRequest(this.editMenuItemForm.value))
      .subscribe((menuItem: MenuItemResponse) => {
        this.menuService.addMenuItemImage(menuItem.id, this.image)
          .subscribe(_ => {
            this.buttonLoading = false;
            menuItem.newImage = this.imageSrc;
            this.emitUpdateItemEvent(menuItem);
            this.hide();
          });
      });
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
        this.editMenuItemForm.controls.image.patchValue({
          fileSource: reader.result
        });
      };
    }
  }
}
