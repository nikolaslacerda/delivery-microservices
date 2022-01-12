import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { CuisineTypeService } from 'src/app/services/cuisine-type.service';
import { RestauranteService } from '../../services/restaurante.service';
import {Restaurant} from '../../models/restaurant';

@Component({
  selector: 'app-restaurant-cadastro',
  templateUrl: './restaurante-cadastro.component.html'
})
export class RestauranteCadastroComponent implements OnInit {

  userInfo: any = { };
  registrandoUsuario = true;

  restaurant: Restaurant = {} as Restaurant;

  tiposDeCozinha: Array<any>;

  mensagem: any;

  cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService,
              private authenticationService: AuthenticationService,
              private tipoDeCozinhaService: CuisineTypeService,
              private restauranteService: RestauranteService) {
  }

  ngOnInit() {
    this.tipoDeCozinhaService.getCuisineTypes().subscribe(data => {
      this.tiposDeCozinha = data;
    });

    const id = this.route.snapshot.params.id;
    if (id) {
      this.registrandoUsuario = false;
      this.restauranteService.parceiroPorId(id)
        .subscribe((restaurante: any) => {
          if (restaurante) {
            this.restaurant = restaurante;
            this.router.navigate([`/restaurants/${restaurante.id}`]);
          }
        }, () => this.router.navigate(['']));
    }
  }

  validaSenhas() {
    return this.userInfo.password === this.userInfo.passwordConfirmation;
  }

  registraUsuario() {
    this.authenticationService.registraParceiro(this.userInfo)
      .subscribe(id => {
        this.registrandoUsuario = false;
        this.userInfo.id = id;
        this.restaurant.userId = id;
      }, () => this.mensagem = 'Erro ao registrar usuário. Tente novamente mais tarde.');
  }

  estaAdicionando() {
    return !this.restaurant.id;
  }

  salvaRestaurante() {
    this.restauranteService.salva(this.restaurant)
      .subscribe(restaurante => {
        this.toaster.success('Dados do restaurant salvos com sucesso.');
        if (this.estaAdicionando()) {
          this.authenticationService.login(this.userInfo)
            .subscribe(() => {
              this.router.navigate([`/restaurants/${restaurante.id}`]);
            });
        }
      });
  }

}
