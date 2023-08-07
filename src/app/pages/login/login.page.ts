import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSplitPane, MenuController } from '@ionic/angular';
import { AlertService } from 'src/app/core/alerts/alert.service';
import { ApiService } from 'src/app/core/api.service';
import { GlobalService } from 'src/app/core/global.service';
import { ToastService } from 'src/app/core/toasts/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login_data:any={ username:'l2e',password:'12' ,role:'admin', c_id:'1'}

  @ViewChild('ionSplitPane') ionSplitPane!: IonSplitPane;


  public user_data:any;

  constructor(private menu: MenuController,public route:Router,
    public alert:AlertService,public toast:ToastService,public ApiCall:ApiService,public global:GlobalService) {
    this.menu.enable(false); 
  }



  ngOnInit() {
   this.menu.enable(false);
  }

async  login(){
  console.log(this.login_data)
      await this.ApiCall.user_Login(this.login_data);
      this.global.Userlogin.subscribe( res => {
        console.log(res);
        this.login_data = res;  
      });
  }

  disableIonSplitPange(){
    this.ionSplitPane.disabled = true; 
  }
  home(){
    this.route.navigate(['home']);
  }

}
