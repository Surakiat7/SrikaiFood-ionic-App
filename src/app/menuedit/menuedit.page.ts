import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FoodService } from '../share/foodservice';

@Component({
  selector: 'app-menuedit',
  templateUrl: './menuedit.page.html',
  styleUrls: ['./menuedit.page.scss'],
})
export class MenueditPage implements OnInit {
  fobj:any;

  constructor(
    private apiService: FoodService,
    public nav: NavController,
    public alertCtrl:AlertController
  ) { }

  ngOnInit() {
    this.apiService.getFoodlist().subscribe((res) => {
      this.fobj = res.map((t) => ({
        id: t.payload.doc.id,
        image: t.payload.doc.data()['image'.toString()],
        name: t.payload.doc.data()['name'.toString()],
        price: t.payload.doc.data()['price'.toString()],
      }));
      console.log(this.fobj)

    }); 
  }

  Back(){
    this.nav.pop();
  }

  async Add() {
    let alert = this.alertCtrl.create({
      header: 'เพิ่มรายการอาหาร',
      inputs: [
        {
          name: 'fimg',
          placeholder: 'url ของอาหาร',
        },
        {
          name: 'fname',
          placeholder: 'ชื่ออาหาร',
        },
        {
          name: 'fprice',
          placeholder: 'ราคาอาหาร',
          type: 'number'
        }
        
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'ยกเลิก',
          handler: data => {
            console.log('ยกเลิก!');
          }
        },
        {
          text: 'เพิ่ม',
          handler: data => { 
            const image = data.fimg;
            const name = data.fname;
            const price = data.fprice;
            const food = {};
            food['image'.toString()] = image;
            food['name'.toString()] = name;
            food['price'] = price;
            this.apiService.createFood(food);
          }
        }
      ]
    });
    (await alert).present();
  }

  async Del(f) {
    const alert = this.alertCtrl.create({
      header: 'ลบรายการอาหาร',
      message: 'ต้องการลบ '+f.name,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'ยกเลิก',
          handler: () => {
            console.log('ยกเลิก');
          }
        },
        {
          text: 'ลบ',
          handler: () => {
            this.apiService.removeFood(f.id);
          }
        }
      ]
    });
    (await alert).present();
  }

  async Edit(f) {
    const alert = this.alertCtrl.create({
      subHeader: 'แก้ไขข้อมูล',
      message: "แก้ไขรายการอาหารชื่อ : "+f.name,
      inputs: [
        {
          name: 'img',
          value: f.image,
          placeholder: 'url รูปภาพ'
        },
        {
          name: 'name',
          value: f.name,
          placeholder: 'ชื่ออาหาร'
        },
        {
          name: 'price',
          value: f.price,
          type: 'number',
          placeholder: 'ราคาสินค้า'
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
          text: 'แก้ไข',
          handler: data => {
            const updatedata = {};
             updatedata['image'.toString()] = data.img;
             updatedata['name'] = data.name;
             updatedata['price'] = data.price;
             ///this.ngFirestore.doc('/Student/'+id).update(updatedata);
             this.apiService.updateFood(f.id, updatedata);
             console.log(updatedata);
          }
        }
      ]
    });
    (await alert).present();
  }

}
