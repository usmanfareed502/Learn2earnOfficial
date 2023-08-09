import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {

  public isOpenseeExpensedetailModal = false;


  constructor() { }

  ngOnInit() {
  }

   setseeExpensedetailclose(isOpen: boolean) {
    this.isOpenseeExpensedetailModal = isOpen;
  }

}
