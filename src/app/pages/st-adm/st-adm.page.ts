import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';
import { GlobalService } from 'src/app/core/global.service';
import { format, parseISO, startOfMonth, addDays, addMonths } from 'date-fns';

@Component({
  selector: 'app-st-adm',
  templateUrl: './st-adm.page.html',
  styleUrls: ['./st-adm.page.scss'],
})
export class StAdmPage implements OnInit {

  data: any;
  Submit: any;
  user: any;
  public end_date1: any;

  constructor(public route: Router, public apiCall: ApiService, public gloabl: GlobalService, public authser: AuthService) { }

  public student_data: any = { c_id: 1, a_id: '', name: '', f_name: '', st_gender: '', contact_no: '', address: '', reference: '', cnic: '', course: '', c_duration: '', upcoming_installment: '', ad_date: '', total_fee: '', per_installment: '', total_installments: '', remaning_amount: '', status: '', st_status: '', fee_status: '', end_date: '', rg_fee: '',installments:[{remaning_amount: ''}] }
  ngOnInit() {

    this.gloabl.Userlogin.subscribe(res => {

      this.data = res.user;
      // if (this.data === undefined) {
      //   this.route.navigate(['/login'])
      // }
      // else {
      //   console.log(this.data);
      //   // this.apiCall.GetStudents(this.data.c_id)
      // }
    });

  }

  installment($event: any) {
    console.log($event.target.value);
    const Y = $event.target.value;
    this.student_data.remaning_amount = this.student_data.total_fee;
  }

  perinstallment($event: any) {
    const nameMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const getCourseMonth = $event.target.value;
    console.log(getCourseMonth, 'duration');
    const d = new Date();
    let currentMonth = d.getMonth()+1;
    let currentYear = d.getFullYear();
    console.log(currentMonth, 'current');

    const x = [];
    this.student_data.installments = [];
    for (let i = 0; i < getCourseMonth; i++) {
      let monthIndex = currentMonth + i;
      let year = currentYear;

      if (monthIndex >= 12) {
        monthIndex = monthIndex % 12;
        year += Math.floor((currentMonth + i) / 12);
      }

      x.push({ month: nameMonth[monthIndex], status: 'pending', year: year });
    }
    console.log(x);
    this.student_data.installments = x;
    

    console.log($event.target.value);
    this.student_data.per_installment = (this.student_data.total_fee / this.student_data.total_installments).toFixed(0);
    console.log(this.student_data);
  }

  async Submit_Data() {
    this.student_data.c_id = this.data.c_id;
    this.student_data.a_id = this.data.c_id;
    console.log(this.student_data);
    this.student_data.end_date = this.end_date1;
    await this.apiCall.AddStudents(this.student_data);
    
    this.student_data = { c_id: '', a_id: '', name: '', f_name: '', st_gender: '', contact_no: '', address: '', reference: '', cnic: '', course: '', c_duration: '', upcoming_installment: '', ad_date: '', total_fee: '', per_installment: '', total_installments: '', advance: '', remaning_amount: '', status: '', st_status: '', fee_status: '', end_date: '', rg_fee: '' }
    this.route.navigate(['st-details']);

  }
  
  month($event:any) {
    console.log($event.target.value);

    // Get the current date
    var now = new Date();
    if (now.getMonth() == 11) {
      var c  = new Date(now.getFullYear() + 1, 0, 1);
      this.student_data.upcoming_installment = format(c, 'yyyy-MM-dd');
    } else {
      var c  = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      this.student_data.upcoming_installment = format(c, 'yyyy-MM-dd');
    }

    console.log(this.student_data.upcoming_installment)
    this.student_data.a_month = format(parseISO($event.target.value), 'MMMM');
    console.log(this.student_data.a_month);
  }

  getNumberOfMonths(duration: string): number {
    if (duration === '1 Month') {
      return 1;
    } else if (duration === '2 Month') {
      return 2;
    } else if (duration === '3 Month') {
      return 3;
    } else if (duration === '6 Month') {
      return 6;
    } else {
      return 0;
    }
  }


  handleCourseDurationChange(event: any) {
    const selectedDuration = event.detail.value;
    const months = this.getNumberOfMonths(selectedDuration);

    const currentDate = new Date();
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + months, currentDate.getDate());
    console.log(endDate)
    this.end_date1 = format(endDate, 'yyyy-MM-dd');
    var end_date = this.end_date1;
    console.log(end_date);
    console.log('Course Duration:', months, 'month(s)');
    console.log('Start Date:', currentDate.toDateString());
    console.log('End Date:', endDate.toDateString());
    this.student_data.end_date = this.end_date1;

  }

  updateRemainingFee() {
    this.student_data.remaining_amount = this.student_data.total_fee - this.student_data.advance;
  }

  home() {
    this.route.navigate(['home'])
  }
  add_student() {
    this.route.navigate(['st-adm'])
  }


  year($event: any) {
    console.log($event.target.value);

    // Get the current date
    var now = new Date();
    var selectedYear = parseInt($event.target.value);

    if (selectedYear === now.getFullYear()) {
      var c = new Date(now.getFullYear() + 1, 0, 1);
      this.student_data.upcoming_installment = format(c, 'yyyy-MM-dd');
    } else if (selectedYear > now.getFullYear()) {
      var c = new Date(selectedYear, 0, 1);
      this.student_data.upcoming_installment = format(c, 'yyyy-MM-dd');
    } else {
      // Handle cases where selected year is in the past
      // You can customize this based on your requirements
      this.student_data.upcoming_installment = ''; // Set an appropriate value for the past year
    }

  }
}
