import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastService } from './core/toasts/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router:Router,private menu: MenuController,public toast:ToastService,) {}


  home(){
    this.router.navigate(['home']);
  }
  add_student(){
    this.router.navigate(['st-adm']);
  }
  see_student(){
    this.router.navigate(['st-details'])
  }
  add_installment(){
    this.router.navigate(['installments'])
  }
  see_installment(){
    this.router.navigate(['see-installments'])
  }
  login(){
    this.router.navigate(['login'])
    this.toast.LogoutSuccessfull();
  }
  add_amount(){
    this.router.navigate(['add-amount'])
  }
  see_account(){
    this.router.navigate(['see-account'])
  }
}
