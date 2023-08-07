import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/global.service';
import { ApiService } from 'src/app/core/api.service';
import { AlertService } from 'src/app/core/alerts/alert.service';
import { ToastService } from 'src/app/core/toasts/toast.service';
import { AnimationController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-st-details',
  templateUrl: './st-details.page.html',
  styleUrls: ['./st-details.page.scss'],
})
export class StDetailsPage implements OnInit {

  
  filterTerm!: string;

  
  public Category: any = 'Student' ;
  public Category2: any = 'feedetails';
  refresher=false;
  // public length:any;

  public student_details:any[] = [];
  res:any; 
  total: any;
  public activeCounter:any;
  public deactiveCounter:any;
  public installment_by_id:any;
  public byCourse:any={c_id:' ',course:'All'}
  public data: any;
  leaveCounter: any;
  public allstudentdetails: any;
  getusebyfilter: any;
  public selectFilter:any = {course:'', status:''};
  dataSource!: MatTableDataSource<any>;
  public installmentsBackup:any[] = [];
  c_id : any = 3 ;
  campus_students: any;


  constructor(public route:Router,public toast:ToastService,
     public modalController: ModalController,public alert:AlertService,
     private animationCtrl: AnimationController,
     public global:GlobalService,public ApiCall:ApiService,) { }

  async  ngOnInit() {
    await  this.Get_Students();
    this.global.Userlogin.subscribe(res => {
 
     this.data = res.user;
     if (this.data === undefined) {
       this.route.navigate(['/login'])
     }
     else {
       console.log(this.data);
       this.ApiCall.GetStudents(this.data.c_id)
       console.log(this.data.c_id)
     }
   });
   }
  home(){
    this.route.navigate(['home']);
  }

  searchItems(value : any){
    this.dataSource = new MatTableDataSource<any>(this.installmentsBackup);
    this.dataSource.filter = value.trim().toLowerCase();
    this.student_details = this.dataSource.filteredData
  }

  async  select_campus($event:any){
    console.log($event.target.value);
    this.selectFilter = $event.target.value;
    this.student_details = this.installmentsBackup ;
    if(this.selectFilter != 'all'){
       this.student_details = this.student_details.filter(val=> val.c_id == this.selectFilter)
       this.campus_students = this.student_details.length
       console.log(this.campus_students)
       console.log(this.student_details)
    } 
  }

  // Student Get Method
  async Get_Students(){

    //  this.ApiCall.GetStudents(this.data.c_id);
      await  this.global.GetStudent.subscribe(res=>{
        console.log(res);
        this.student_details = res;
        console.log(this.student_details);
        this.getusebyfilter = res;
        this.total = res.length;
        this.installmentsBackup = res ;
      });
  
      await  this.global.Active.subscribe( res => {
        this.activeCounter =res;
        console.log(res)
      });
  
      await this.global.Deactive.subscribe( res => {
        this.deactiveCounter =res;
        console.log(res)
      } );
      this.global.Leave.subscribe( res => {
        this.leaveCounter =res;
        console.log(this.deactiveCounter)
      } );
      
    }

    async select_student_Course($event:any){
      this.selectFilter.course = $event.target.value;
      console.log($event.target.value);
      // this.byCourse.course = $event.target.value;
      // this.byCourse.c_id = this.data.c_id;
      // console.log(this.byCourse);
      if($event.target.value  == 'all'){
        if(this.selectFilter.status === '' || this.selectFilter.status === 'all') {
          this.student_details = this.getusebyfilter;
        }
        else {
          this.student_details = this.getusebyfilter.filter((x: { st_status: any; }) => x.st_status == this.selectFilter.status);
          }
      }
      else{
      
      if(this.selectFilter.status === '' || this.selectFilter.status === 'all') {
      
        this.student_details = this.getusebyfilter.filter((x: { course: any; }) =>x.course === this.selectFilter.course);
        }
        else {
        this.student_details = this.getusebyfilter.filter((x: { st_status: any; course: any; }) => x.st_status == this.selectFilter.status &&  x.course === this.selectFilter.course);
        }
          console.log(this.student_details)
    }
    }
  
   async  select_status($event:any){
      console.log($event.target.value);
      this.selectFilter.status = $event.target.value;
   if($event.target.value =='all'){
    if(this.selectFilter.course === '' || this.selectFilter.course === 'all') {
      this.student_details = this.getusebyfilter;
    }
    
    else {
      this.student_details = this.getusebyfilter.filter((x: { course: any; }) => x.course == this.selectFilter.course);
      }
   }
   else{
   
   if(this.selectFilter.course === ''|| this.selectFilter.course === 'all') {
   
     this.student_details = this.getusebyfilter.filter((x: { st_status: any; }) =>x.st_status === this.selectFilter.status);
     }
     else {
       
     this.student_details = this.getusebyfilter.filter((x: { course: any; st_status: any; }) => x.course == this.selectFilter.course &&  x.st_status === this.selectFilter.status);
     }
       console.log(this.student_details)
  }
  }

  async refresh(){
    this.refresher=true
    setTimeout(() => {
      this.refresher=false,
      this.ApiCall.GetStudents(this.data.c_id);
      this.Get_Students();
    }, 1500 ); 
  }

  async seeDeatils(data: any) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-modal-class',
      initialBreakpoint: 1 ,
      breakpoints: [1, 0.435, 0.93],
      componentProps: {
        'StudentDetails': data,
        'Category': "viewdetails",
      }
    });
    return await modal.present();
  }
  
  async updateModal(data: any) {
    
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-modal-class',
      initialBreakpoint: 0.93 ,
      breakpoints: [0, 0.435, 0.93],
      componentProps: {
        'updateStudent': data,
        'Category': this.Category,
      }
    });
    console.log('modal')
    return await modal.present();
  }

  // see_all_installment by student id
  async view_all_installment(item:any) {
    console.log(item);
    const x ={id:item.id, c_id:this.data.c_id}
    console.log(x);
    
    await this.ApiCall.get_InstallmentsbyStudentId(x)
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
        'Category' : this.Category2,
      }
    });
    console.log('modal')
    return await modal.present();
  }


}
