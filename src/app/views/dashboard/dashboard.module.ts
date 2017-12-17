import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {CommonModule} from "@angular/common";
import {ModalModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    FormsModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
