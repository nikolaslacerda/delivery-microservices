import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MenuService} from '../../../../services/menu.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {MenuItemUpdateRequest} from '../../../../model/menu-item-update-request.model';

@Component({
  selector: 'app-edit-menu-item-modal',
  templateUrl: './edit-menu-item-modal.component.html',
  styleUrls: ['./edit-menu-item-modal.component.css']
})
export class EditMenuItemModalComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

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
  list: any[] = [];
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
    this.imageSrc = this.list[0].item.imageUrl;

    this.menuService.getCategory(this.list[0].item.menuCategoryId)
      .subscribe(res => {
        this.menuService.getCategoriesByMenu(res.menuId)
          .subscribe(allMenuCategories => this.allCategories = allMenuCategories);
      });
  }

  private _populateForm(): void {
    this.editMenuItemForm.patchValue({
      name: this.list[0].item.name,
      description: this.list[0].item.description,
      menuCategoryId: this.list[0].item.menuCategoryId,
      unitPrice: this.list[0].item.unitPrice,
      unitOriginalPrice: this.list[0].item.unitOriginalPrice
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
        console.log('Não tem imagem');
        this.menuService.updateMenuItem(this.list[0].item.id, new MenuItemUpdateRequest(this.editMenuItemForm.value))
          .subscribe(menuItem => {
            console.log(menuItem);
            this.buttonLoading = false;
            this.emitAdd(menuItem);
            this.hide();
          });
      } else {
        console.log('Tem imagem');
        this.menuService.updateMenuItem(this.list[0].item.id, new MenuItemUpdateRequest(this.editMenuItemForm.value))
          .subscribe(menuItem => {
            this.menuService.addMenuItemImage(menuItem.id, this.image)
              .subscribe(res => {
                menuItem.imageUrl = 'assets/img/foods/' + res.uploadedFile.filename;
                this.menuService.updateMenuItem(menuItem.id, menuItem)
                  .subscribe(menuItem2 => {
                    this.buttonLoading = false;
                    this.emitAdd(menuItem2);
                    this.hide();
                  });
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
