import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  constructor(public route:Router) { }

  customer = {}
  Form() {
    console.log(this.customer);
  }

  submit(){
    const customer = this.customer;
    const data = JSON.stringify(customer);
    this.route.navigate(['menu',data]);
  }

  ngOnInit() {
    this.Form();
  }

}
