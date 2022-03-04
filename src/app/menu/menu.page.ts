import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FoodService } from '../share/foodservice';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  fobj:any;
  obj:any;
  Orderobj:any;

  constructor(
    private apiService: FoodService,
    public nav: NavController,
    public alertCtrl:AlertController,
    private ngFirestore: AngularFirestore,
    public AcRoute: ActivatedRoute,
    public route:Router
  ) { }

  ngOnInit() {
    const cusobj = this.AcRoute.snapshot.paramMap.get('data');
    this.obj = JSON.parse(cusobj);
    console.log(this.obj);
    this.apiService.getFoodlist().subscribe((res) => {
      this.fobj = res.map((t) => ({
        id: t.payload.doc.id,
        image: t.payload.doc.data()['image'.toString()],
        name: t.payload.doc.data()['name'.toString()],
        price: t.payload.doc.data()['price'.toString()]
      }));
      console.log(this.fobj)

    }); 
  }
  

  AddOrder(f){
    const food = {};
    food['image'.toString()] = f.image;
    food['name'.toString()] = f.name;
    food['price'] = f.price;
    food['count'] = 1;
    this.apiService.getOrderlist().subscribe((res) => {
      this.Orderobj = res.map((t) => ({
        id: t.payload.doc.id,
        image: t.payload.doc.data()['image'.toString()],
        name: t.payload.doc.data()['name'.toString()],
        price: t.payload.doc.data()['price'.toString()],
        count: t.payload.doc.data()['count'.toString()],
      }));
    });
    if (this.Orderobj.length == 0){
      this.apiService.createOrder(food);
    }
    else{
      let c = 0;
      for (let i = 0; i < this.Orderobj.length; i++){
        if (this.Orderobj[i]['name'] == food['name']){
          console.log("Founds");
          c +=1;
        }else{
          console.log("Not Founds");
        }
      }
      if(c == 0){
        this.apiService.createOrder(food);
      }

    }

    
  //   this.ngFirestore.collection('Order', ref => ref.where('name', "==", f.name)).snapshotChanges().subscribe(res => {
  //     if (res.length > 0)
  //     {
  //       console.log("Founds");
  //     }
  //     else
  //     {
  //       console.log("Does not exist.");
  //       console.log(food);
  //       // this.apiService.createOrder(food);
  //     }
  // });
  //this.apiService.createOrder(food);
  }


  Back(){
    this.route.navigate(['customer']);
  }

  submitfood(){
    const customer = this.obj;
    const data = JSON.stringify(customer);
    this.route.navigate(['confirmmenu',data]);
  }
}




