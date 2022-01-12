import { Component, OnInit, Input } from '@angular/core';

// import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { HorarioDeFuncionamentoService } from '../../services/horario-de-funcionamento.service';
import { DiaDaSemanaService } from '../../services/dia-da-semana.service';
import {Restaurant} from '../../models/restaurant';

@Component({
  selector: 'app-horarios-de-funcionamento',
  templateUrl: './horarios-de-funcionamento.component.html'
})
export class HorariosDeFuncionamentoComponent implements OnInit {

  @Input() restaurant: Restaurant;
  horariosDeFuncionamento: Array<any> = [];
  horarioDeFuncionamento: any = {};
  diasDaSemana: Array<any> = [];

  // modalRef: NgbModalRef;

  constructor(// private modal: NgbModal,
              private horarioDeFuncionamentoService: HorarioDeFuncionamentoService,
              private diaDaSemanaService: DiaDaSemanaService) {
  }

  ngOnInit() {
    this.diasDaSemana = this.diaDaSemanaService.diasDaSemana;

    if (this.restaurant.id) {
      this.horarioDeFuncionamentoService.todosDoRestaurante(this.restaurant)
        .subscribe(horarios => this.horariosDeFuncionamento = horarios);
    }
  }

  adiciona(horarioDeFuncionamentoModal) {
    this.horarioDeFuncionamento = {};
    // this.modalRef = this.modal.open(horarioDeFuncionamentoModal);
  }

  edita(horarioDeFuncionamentoModal, horarioDeFuncionamento) {
    this.horarioDeFuncionamento = Object.assign({}, horarioDeFuncionamento);
    // this.modalRef = this.modal.open(horarioDeFuncionamentoModal);
  }

  remove(horario) {
    horario.restaurante = this.restaurant;
    this.horarioDeFuncionamentoService.remove(horario).subscribe(() => {
      this.horariosDeFuncionamento = this.horariosDeFuncionamento.filter(h => h !== horario);
    });
  }

  salva() {
    this.horarioDeFuncionamento.restaurante = this.restaurant;
    this.horarioDeFuncionamentoService.salva( this.horarioDeFuncionamento)
      .subscribe(horarioDeFuncionamento => {
        if (this.horarioDeFuncionamento.id) {
          const indice = this.horariosDeFuncionamento.findIndex(f => f.id === horarioDeFuncionamento.id);
          this.horariosDeFuncionamento[indice] = horarioDeFuncionamento;
        } else {
          this.horariosDeFuncionamento.push(horarioDeFuncionamento);
        }
        this.horariosDeFuncionamento = this.horarioDeFuncionamentoService.sortHours(this.horariosDeFuncionamento);
        this.horarioDeFuncionamento = {};
        // this.modalRef.close();
      });
  }

}
