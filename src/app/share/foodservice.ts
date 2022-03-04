import { Injectable } from '@angular/core';
//import { Food } from './food';
import { AngularFireDatabase, AngularFireList, AngularFireObject }
 from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  stdList: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase, private ngFirestore: AngularFirestore) { }


  //Order
  getOrderlist() {
    return this.ngFirestore.collection('Order').snapshotChanges();
  }

  createOrder(o: any) {
    return this.ngFirestore.collection('Order').add(o);
  }
  removeOrder(oid) {
    return this.ngFirestore.doc('Order' + '/' + oid).delete();
  }

  

  updateOrder(oid, updatedata: any) {
    return this.ngFirestore.doc('Order' + '/' + oid).update(updatedata);
  }

  //Orderlist
  getOrderslist() {
    return this.ngFirestore.collection('Orderlist').snapshotChanges();
  }

  createOrderlist(o: any) {
    return this.ngFirestore.collection('Orderlist').add(o);
  }
  removeOrderlist(oid) {
    return this.ngFirestore.doc('Orderlist' + '/' + oid).delete();
  }

  updateOrderlist(oid, updatedata: any) {
    return this.ngFirestore.doc('Orderlist' + '/' + oid).update(updatedata);
  }

  //Foodlist
  getFoodlist() {
    return this.ngFirestore.collection('Foodlist').snapshotChanges();
  }

  createFood(f: any) {
    return this.ngFirestore.collection('Foodlist').add(f);
  }
  removeFood(fid) {
    return this.ngFirestore.doc('Foodlist' + '/' + fid).delete();
  }

  updateFood(fid, updatedata: any) {
    return this.ngFirestore.doc('Foodlist' + '/' + fid).update(updatedata);
  }


  async list(){
    const documentReferences = await this.ngFirestore
        .collection('someCollection')//.listDocuments()
        
    //const documentIds = documentReferences.map(it => it.id)
  }
  

}