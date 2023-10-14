import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSplitPane, MenuController } from '@ionic/angular';
import { ToastService } from './core/toasts/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('ionSplitPane') ionSplitPane!: IonSplitPane;
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
    this.router.navigate(['/login'])
    this.toast.LogoutSuccessfull();
    this.ionSplitPane.disabled = true
    this.menu.enable(false);
  }
  see_account(){
    this.router.navigate(['see-account'])
  }
  add_team(){
    this.router.navigate(['add-team'])
  }
}
