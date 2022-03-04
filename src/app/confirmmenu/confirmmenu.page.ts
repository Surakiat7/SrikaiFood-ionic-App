import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../share/foodservice';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { forEach,sum} from 'lodash';

@Component({
  selector: 'app-confirmmenu',
  templateUrl: './confirmmenu.page.html',
  styleUrls: ['./confirmmenu.page.scss'],
})
export class ConfirmmenuPage implements OnInit {
  obj:any;
  Orderobj:any;
  Order:any;

  constructor(
    public AcRoute: ActivatedRoute,
    private apiService:FoodService,
    public alertCtrl:AlertController,
    public route:Router,
    private ngFirestore: AngularFirestore
    ) { }

  ngOnInit() {
    const cusobj = this.AcRoute.snapshot.paramMap.get('data');
    this.obj = JSON.parse(cusobj);
    console.log(this.obj);

    this.apiService.getOrderlist().subscribe((res) => {
      this.Orderobj = res.map((t) => ({
        id: t.payload.doc.id,
        image: t.payload.doc.data()['image'.toString()],
        name: t.payload.doc.data()['name'.toString()],
        price: t.payload.doc.data()['price'.toString()],
        count: t.payload.doc.data()['count'.toString()],
      }));
      console.log(this.Orderobj)

    });
  }

  async del(o) {
    const alert = this.alertCtrl.create({
      message: 'ต้องการลบรายการออเดอร์ที่ชื่อ '+o.name,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'ยกเลิก',
          handler: () => {
            console.log('ยกเลิก!!');
          }
        },
        {
          text: 'ลบออเดอร์',
          handler: () => {
            this.apiService.removeOrder(o.id);
          }
        }
      ]
    });
    (await alert).present();
  }

  async editcount(o) {
    const alert = this.alertCtrl.create({
      subHeader: 'เพิ่ม',
      message: "กรุณากรอกจำนวนที่ต้องการ : "+o.name,
      inputs: [
        {
          name: 'count',
          //placeholder: address,
          value: o.count,
          type: 'number',
          placeholder: 'จำนวนจาน'
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'ยกเลิก',
          handler: data => {
            console.log('ยกเลิก');
          }
        },
        {
          text: 'แก้ไขจำนวน',
          handler: data => {
            const updatedata = {};
             updatedata['count'] = data.count;
             ///this.ngFirestore.doc('/Student/'+id).update(updatedata);
             this.apiService.updateOrder(o.id, updatedata);
             console.log(updatedata);
          }
        }
      ]
    });
    (await alert).present();
  }

  Back(){
    const customer = this.obj;
    const data = JSON.stringify(customer);
    this.route.navigate(['menu',data]);
  }

  async SumbitOrder() {
    const alert = this.alertCtrl.create({
      subHeader: 'ยืนยันการสั่งออเดอร์',
      message: "คุณต้องการสั่งรายการอาหารทั้งหมดหรือไม่ ?",
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'ยกเลิก',
          handler: data => {
            console.log('ยกเลิก');
          }
        },
        {
          text: 'ยืนยัน',
          handler: data => {
            this.addOrder();
            console.log("เพิ่มมมมม");
            const customer = this.obj;
            const datas = JSON.stringify(customer);
            this.route.navigate(['successmenu',datas]);
          }
        }
      ]
    });
    (await alert).present();
  }



  addOrder(){
    let name = "";
    let sum = 0;
    this.apiService.getOrderlist().subscribe((res) => {
      this.Orderobj = res.map((t) => ({
        id: t.payload.doc.id,
        image: t.payload.doc.data()['image'.toString()],
        name: t.payload.doc.data()['name'.toString()],
        price: t.payload.doc.data()['price'.toString()],
        count: t.payload.doc.data()['count'.toString()],
      }));
    });
      const data = JSON.stringify(this.Orderobj);
      for (let i = 0; i < this.Orderobj.length; i++){
        const ids = this.Orderobj[i]["id"];
        console.log(ids);
        this.apiService.removeOrder(ids);

        const price = this.Orderobj[i]["price"];
        const count = this.Orderobj[i]["count"];
        let prices = parseFloat(price);
        let counts = parseInt(count);
        sum += prices*counts;
        name += this.Orderobj[i]["name"]+" "+this.Orderobj[i]["count"]+",";
        console.log(sum);
        //console.log(this.name);
        
      }

      const orderlist = {};
      orderlist['Customer'.toString()] = this.obj['Customername'];
      orderlist['TableNo'.toString()] = this.obj['TableNo'];
      orderlist['name'.toString()] = name;
      orderlist['price'] = sum;
      orderlist['status'.toString()] = "ยังไม่เสร็จ";
      this.apiService.createOrderlist(orderlist);

  }
}
