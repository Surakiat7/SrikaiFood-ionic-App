import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-successmenu',
  templateUrl: './successmenu.page.html',
  styleUrls: ['./successmenu.page.scss'],
})
export class SuccessmenuPage implements OnInit {
  obj:any;
  constructor(
    public route:Router,
    public AcRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const cusobj = this.AcRoute.snapshot.paramMap.get('datas');
    this.obj = JSON.parse(cusobj);
    console.log(this.obj);
  }

  Back(){
    console.log("ทำงาน")
    const customer = this.obj;
    const data = JSON.stringify(customer);
    this.route.navigate(['customer']);
  }
}
