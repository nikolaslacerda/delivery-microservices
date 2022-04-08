import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MenuService} from '../../../../services/menu.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {MenuItemRequest} from '../../../../model/menu-item-request.model';
import {MenuCategoryResponse} from '../../../../model/menu-category-response.model';
import {MenuItemResponse} from '../../../../model/menu-item-response.model';

@Component({
  selector: 'app-add-menu-item-modal',
  templateUrl: './add-menu-item-modal.component.html',
  styleUrls: ['./add-menu-item-modal.component.css']
})
export class AddMenuItemModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  buttonLoading = false;
  imageSrc = '';
  image!: File;

  category = {} as MenuCategoryResponse;
  addMenuItemForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    menuCategoryId: ['', Validators.required],
    unitPrice: ['', [Validators.required, Validators.min(0.1)]],
    unitOriginalPrice: ['', [Validators.required, Validators.min(0.1)]],
    image: this.fb.group({
      file: ['', Validators.required],
      fileSource: ['', Validators.required]
    })
  });

  constructor(private fb: FormBuilder,
              public bsModalRef: BsModalRef,
              private menuService: MenuService) {
  }

  ngOnInit(): void {
    this._populateForm();
  }

  private _populateForm(): void {
    this.addMenuItemForm.patchValue({
      menuCategoryId: this.category.id
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
        this.menuService.createItem(new MenuItemRequest(this.addMenuItemForm.value))
          .subscribe((menuItem: MenuItemResponse) => {
            this.buttonLoading = false;
            this.emitAdd(menuItem);
            this.hide();
          });
      } else {
        this.menuService.createItem(new MenuItemRequest(this.addMenuItemForm.value))
          .subscribe((menuItem: MenuItemResponse) => {
            // this.menuService.addMenuItemImage(menuItem.id, this.image)
            //   .subscribe(res => {
            //     menuItem.imageUrl = 'https://localhost:3001/partner/item/image/' + res.uploadedFile.filename;
            //     this.menuService.editItem(menuItem.id, menuItem).subscribe(() => {
            //       this.buttonLoading = false;
            //       this.emitAdd(menuItem);
            //       this.hide();
            //     });
            //   });
          });
      }
    }
  }
}
