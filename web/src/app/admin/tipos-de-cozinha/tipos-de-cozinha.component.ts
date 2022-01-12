import { Component, OnInit } from '@angular/core';

// import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
//
// import { CuisineTypeService } from 'src/app/services/tipo-de-cozinha.service';


@Component({
  selector: 'app-tipos-de-cozinha',
  templateUrl: './tipos-de-cozinha.component.html'
})
export class TiposDeCozinhaComponent implements OnInit {

  // tiposDeCozinha: Array<any> = [];
  // tipoDeCozinha: any = {};
  //
  // modalRef: NgbModalRef;
  //
  // constructor(private modal: NgbModal,
  //             private tipoDeCozinhaService: CuisineTypeService) { }
  //
   ngOnInit() {
  //   this.tipoDeCozinhaService.getCuisineTypes()
  //     .subscribe(tiposDeCozinha => {
  //       this.tiposDeCozinha = tiposDeCozinha;
       }
  // );}
  //
  // adiciona(tipoDeCozinhaModal) {
  //   this.tipoDeCozinha = {};
  //   this.modalRef = this.modal.open(tipoDeCozinhaModal);
  // }
  //
  // edita(tipoDeCozinhaModal, tipoDeCozinha) {
  //   this.tipoDeCozinha = Object.assign({}, tipoDeCozinha);
  //   this.modalRef = this.modal.open(tipoDeCozinhaModal);
  // }
  //
  // remove(tipoDeCozinha) {
  //   this.tipoDeCozinhaService.remove(tipoDeCozinha)
  //     .subscribe(() =>
  //       this.tiposDeCozinha = this.tiposDeCozinha.filter(t => t.id !== tipoDeCozinha.id)
  //     );
  // }
  //
  // salva() {
  //   this.tipoDeCozinhaService.create(this.tipoDeCozinha)
  //     .subscribe(tipoDeCozinha => {
  //       if (this.tipoDeCozinha.id) {
  //         const indice = this.tiposDeCozinha.findIndex(t => t.id === tipoDeCozinha.id);
  //         this.tiposDeCozinha[indice] = tipoDeCozinha;
  //       } else {
  //         this.tiposDeCozinha.push(tipoDeCozinha);
  //       }
  //       this.tiposDeCozinha = this.tiposDeCozinha.sort((a, b) => a.name.localeCompare(b.name));
  //       this.tipoDeCozinha = {};
  //       this.modalRef.close();
  //     });
  // }

}
