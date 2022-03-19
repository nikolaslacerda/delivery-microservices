import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from './pipes/pipes.module';
import {LoadingComponent} from './components/loading/loading.component';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    LoadingComponent,
    PipesModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
