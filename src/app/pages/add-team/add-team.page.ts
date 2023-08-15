import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {

  public isOpenseeExpensedetailModal = false;


  constructor(public route: Router,) { }

  ngOnInit() {
  }

   setseeExpensedetailclose(isOpen: boolean) {
    this.isOpenseeExpensedetailModal = isOpen;
  }


  home() {
    this.route.navigate(['home'])
  }
}
