import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/core/alerts/alert.service';
import { ApiService } from 'src/app/core/api.service';
import { GlobalService } from 'src/app/core/global.service';
import { ToastService } from 'src/app/core/toasts/toast.service';

import { format, parseISO } from 'date-fns';
import { MatTableDataSource } from '@angular/material/table';
import { ModalPage } from '../modal/modal.page';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-see-installments',
  templateUrl: './see-installments.page.html',
  styleUrls: ['./see-installments.page.scss'],
})
export class SeeInstallmentsPage implements OnInit {

  selectedStatus: any;
  filterTerm!: string;

   refresher=false;
   public total : any = 0;
   dataSource!: MatTableDataSource<any>;
   
   public student_Installments:any[] = [];
   public installmentsBackup:any[] = [];

   public Category: any = 'installmentupdate';
   public Category2: any = 'feedetails';
   public installment_by_id:any;
   public by_Month:any={a_month:''}
  data: any;
  public installmentbymonth: any = {c_id:null ,f_status: null,start: null, end:null}
  select_student_Data: any;
  selectFilter: any;
  pending_FeeSt: any = 0;
  complete_FeeSt: any = 0;
  public  student_Installments_length2: any;
  student_Installments_length3: any;
  campus_students: any;

  constructor(public route:Router,public toast:ToastService, private datePipe: DatePipe,
    public modalController: ModalController,public alert:AlertService,
    public global:GlobalService,public ApiCall:ApiService) { 
  
    }


  ngOnInit() {

    this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data);

      // this.ApiCall.GetInstallments(this.data.c_id);
   });
   this.Get_Installments();
  }
  async Get_Installments(){
    this.installmentbymonth.c_id = this.data.c_id;
    this.ApiCall.GetInstallments(this.data.c_id);
    await this.global.StudentInstall.subscribe(res => {
      console.log(res);  
      this.student_Installments = res;
      this.installmentsBackup = res ;
      this.total = res;
      console.log(this.total)
    });

    await  this.global.Pending_fee.subscribe( res => {
      this.pending_FeeSt =res;
      console.log(res)
    });

    await  this.global.Complete_fee.subscribe( res => {
      this.complete_FeeSt =res;
      console.log(res)
    });

  }
  searchItems(value : any){
    this.dataSource = new MatTableDataSource<any>(this.installmentsBackup);
    this.dataSource.filter = value.trim().toLowerCase();
    this.student_Installments = this.dataSource.filteredData
  }

  async  select_status($event:any){
    console.log($event.target.value);
    this.installmentbymonth.f_status = $event.target.value;
  //   if( $event.target.value == 'all'){
  //     this.Get_Installments()
  //   }
  //  else{
  //   const x = { c_id:this.data.c_id , f_status:$event.target.value}
  //   this.ApiCall.GetInstallmentsbyidandst(x);
  //   this.global.StudentInstall.subscribe( res=>{
  //     this.student_Installments = res;
  //   })
  //  }
  }
  async  select_campus($event:any){
    console.log($event.target.value);
    this.selectFilter = $event.target.value;
    this.student_Installments = this.installmentsBackup ;
    if(this.selectFilter != 'all'){
       this.student_Installments = this.student_Installments.filter(val=> val.c_id == this.selectFilter)
        this.student_Installments_length2 = this.student_Installments.length
       console.log(this.student_Installments_length2)
       console.log(this.student_Installments)
    } 
  }

    // Get_Installments function
    
    get_installmentbymoont(event: any) {
      const startDate = new Date(event.target.value);
      startDate.setDate(1); // Set the day to 1 to get the start of the month
  
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(endDate.getDate() - 1); // Subtract 1 day to get the end of the month
  
      const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
      const formattedEndDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
      console.log(formattedStartDate);
      console.log(formattedEndDate);
      this.installmentbymonth.start = formattedStartDate;
      this.installmentbymonth.end = formattedEndDate;
      return { start: formattedStartDate, end: formattedEndDate };
    }
    filterdata(){
      console.log(this.installmentbymonth);
      this.ApiCall.GetInstallmentsbyidandst(this.installmentbymonth);

    }
//   async get_installmentbymoont(event:any) {
//     console.log(event.target.value)
//     const monthName = format(parseISO(event.target.value), 'MMMM-yyyy');
//     console.log(monthName);
//     var Value=event.target.value.split("-");
//     var year = Value[0];
//     var month = Value[1];
//     this.installmentbymonth.month = month;
//     this.installmentbymonth.year = year;
//     console.log(month, year);
//     console.log(this.installmentbymonth);
//    await this.ApiCall.GetInstallmentsbymonth(this.installmentbymonth);
//    this.Get_Installments();
// }
    // see_student_installment by student id
    async view_all_installment(data:any) {
      const x = {id:data, c_id:this.data.c_id}
      await this.ApiCall.get_InstallmentsbyStudentId(x);
      this.global.StudentIdinstallment.subscribe(res => {
        console.log(res);
        this.installment_by_id = res; 
       });
       
     const modal = await this.modalController.create({
        component: ModalPage,
        cssClass: 'my-modal-class',
        initialBreakpoint: 0.93 ,
        breakpoints: [0, 0.435, 0.93],
        componentProps: {
          'Installment_details' : this.installment_by_id,
          'Category2' : this.Category2,
        }
      });
      console.log('modal')
      return await modal.present();
    }
  
  

  refresh(){
    this.refresher=true
    setTimeout(() => {
      this.refresher=false,
      this.ApiCall.GetInstallments(this.data.c_id);
      this.Get_Installments();
    }, 1500 ); 
    this.installmentbymonth = {c_id:null,f_status: null,start: null, end: null}
  }

  
  home(){
    this.route.navigate(['home']);
  }
 
}
