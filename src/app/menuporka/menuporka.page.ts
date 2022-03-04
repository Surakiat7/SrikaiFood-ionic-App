import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FoodService } from '../share/foodservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menuporka',
  templateUrl: './menuporka.page.html',
  styleUrls: ['./menuporka.page.scss'],
})
export class MenuporkaPage implements OnInit {

  Orderobj:any;

  constructor(
    public AcRoute:ActivatedRoute,
    private apiService:FoodService,
    public alertCtrl:AlertController,
    public route:Router) { }

  ngOnInit() {
    this.apiService.getOrderslist().subscribe((res) => {
      this.Orderobj = res.map((t) => ({
        id: t.payload.doc.id,
        Customer: t.payload.doc.data()['Customer'.toString()],
        TableNo: t.payload.doc.data()['TableNo'.toString()],
        name: t.payload.doc.data()['name'.toString()],
        price: t.payload.doc.data()['price'.toString()],
        status: t.payload.doc.data()['status'.toString()],
      }));
      console.log(this.Orderobj)

    }); 
  }

  async Del(o) {
    const alert = this.alertCtrl.create({
      message: 'ต้องการลบรายการออเดอร์โต๊ะที่ '+o.TableNo,
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
            this.apiService.removeOrderlist(o.id);
          }
        }
      ]
    });
    (await alert).present();
  }

  async Edit(o) {
    const alert = this.alertCtrl.create({
      message: "แก้ไขสถานะของออเดอร์โต๊ะที่ "+o.TableNo,
      inputs : [
        {
            name:'ยังไม่เสร็จ',
            type:'radio',
            label:'ยังไม่เสร็จ',
            value:'ยังไม่เสร็จ'
        },
        {
          name:'เสร็จเรียบร้อย',
            type:'radio',
            label:'เสร็จเรียบร้อย',
            value:'เสร็จเรียบร้อย'
        },
        {
          name:'จ่ายเงินแล้ว',
            type:'radio',
            label:'จ่ายเงินแล้ว',
            value:'จ่ายเงินแล้ว'
        }],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'ยกเลิก',
          handler: data => {
            console.log('ยกเลิก!!');
          }
        },
        {
          text: 'แก้ไข',
          handler: data => {
            const updatedata = {};
            console.log(JSON.stringify(data))
             updatedata['status'] = JSON.stringify(data);
             this.apiService.updateOrderlist(o.id, updatedata);
          }
        }
      ]
    });
    (await alert).present();
  }

  List(){
    this.route.navigate(['menuedit']);
  }
}
