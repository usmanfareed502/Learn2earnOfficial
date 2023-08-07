import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeInstallmentsPageRoutingModule } from './see-installments-routing.module';

import { SeeInstallmentsPage } from './see-installments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeInstallmentsPageRoutingModule,
    
  ],
  declarations: [SeeInstallmentsPage,]
})
export class SeeInstallmentsPageModule {}
