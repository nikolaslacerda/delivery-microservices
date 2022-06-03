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
    menuCategoryId: ['', Validators.required],
    unitPrice: ['', Validators.required],
    unitOriginalPrice: ['', Validators.required],
    image: this.fb.group({
      file: [''],
      fileSource: ['']
    })
  });
  imageSrc: any;
  image!: File;
  buttonLoading = false;
  allCategories: any;

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this._populateForm();
    this.imageSrc = 'https://localhost:3001/partner/item/image/' + this.item.imageUrl;
    this.menuService.getCategories(1, 1).subscribe(allMenuCategories => this.allCategories = allMenuCategories);
  }

  private _populateForm(): void {
    this.editMenuItemForm.patchValue({
      name: this.item.name,
      description: this.item.description,
      unitPrice: this.item.promotionalPrice,
      unitOriginalPrice: this.item.price
    });
  }

  public hide(): void {
    this.bsModalRef.hide();
  }

  emitAdd(item: any): void {
    this.event.emit(item);
  }

  updateMenuItem(): void {
    if (this.editMenuItemForm.valid) {
      this.buttonLoading = true;
      if (!this.editMenuItemForm.value.image.fileSource.length) {
        this.menuService.editItem(this.item.id, new MenuItemUpdateRequest(this.editMenuItemForm.value))
          .subscribe((menuItem: MenuItemResponse) => {
            this.buttonLoading = false;
            this.emitAdd(menuItem);
            this.hide();
          });
      } else {
        this.menuService.editItem(this.item.id, new MenuItemUpdateRequest(this.editMenuItemForm.value))
          .subscribe((menuItem: MenuItemResponse) => {
            this.menuService.addMenuItemImage(menuItem.id, this.image)
              .subscribe(res => {
                menuItem.imageUrl = 'https://localhost:3001/partner/item/image/' + res.uploadedFile.filename;
                // this.menuService.editItem(menuItem.id, menuItem)
                //   .subscribe(menuItem2 => {
                //     this.buttonLoading = false;
                //     this.emitAdd(menuItem2);
                //     this.hide();
                //   });
              });
          });
      }
    }
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
