import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MenuService} from '../../../../services/menu.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {MenuItemRequest} from '../../../../model/menu-item-request.model';

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
  list: any[] = [];

  constructor(private fb: FormBuilder,
              public bsModalRef: BsModalRef,
              private menuService: MenuService) {
  }

  ngOnInit(): void {
    console.log(this.list[0]);
    this._populateForm();
  }

  private _populateForm(): void {
    this.addMenuItemForm.patchValue({
      menuCategoryId: this.list[0].category.id
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
        this.menuService.addMenuItem(new MenuItemRequest(this.addMenuItemForm.value))
          .subscribe(menuItem => {
            this.buttonLoading = false;
            this.emitAdd(menuItem);
            this.hide();
          });
      } else {
        console.log('tem imagem');
        this.menuService.addMenuItem(new MenuItemRequest(this.addMenuItemForm.value))
          .subscribe(menuItem => {
            this.menuService.addMenuItemImage(menuItem.id, this.image)
              .subscribe(res => {
                console.log(res.uploadedFile);
                menuItem.imageUrl = 'assets/img/foods/' + res.uploadedFile.filename;
                this.menuService.updateMenuItem(menuItem.id, menuItem).subscribe(() => {
                  this.buttonLoading = false;
                  this.emitAdd(menuItem);
                  this.hide();
                });
              });
          });
      }
    }
  }
}
