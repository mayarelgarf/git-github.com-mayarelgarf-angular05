import { Component } from '@angular/core';
import { CartLine } from 'src/app/interfaces/cart-line';
import { StorageService } from 'src/app/services/storage.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(private storageService: StorageService,private authService: AuthService,private order: OrderService) {
    this.cartLines = storageService.getCartLines();
  }

  cartLines: CartLine[] = [];
  checkOutForm =new  FormGroup({
    client_Name : new FormControl('',Validators.required),
    client_lastName: new FormControl('',Validators.required),
    client_Email: new FormControl('',Validators.email),
    client_number: new FormControl('',Validators.pattern('[0-9]+')),
    client_Address1: new FormControl('',Validators.required),
    client_Address2: new FormControl('',Validators.required),
    client_city:new FormControl('',Validators.required),
    client_zipCode: new FormControl('',Validators.pattern('[0-5]+'))
    
  })
  date(){
    var d = new Date();
   return d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();}
   submit_order(){
    
     var body=JSON.stringify({
       "sub_total_price": this.getSubTotal(),
       "shipping": this.getShipping(),
       "total_price": this.getTotal(),
       "the_Date":this.date(),
       "user_id": this.authService.client_id(),
       
       "order_details": [JSON.parse(localStorage.getItem('products')||"")
     
     ],
     "shipping_info": this.checkOutForm.value
     })
     if(this.checkOutForm.valid){
       console.log(this.checkOutForm.value)
       this.order.order(body).subscribe((data: any)=>{console.log(data)})
   
     }}

  getTotal(): number {
    return this.getShipping() + this.getSubTotal();
  }
  getSubTotal(): number {
    return this.cartLines
      .map((x) => x.price * x.quantity)
      .reduce((a, v) => (a += v), 0);
  }
  getShipping(): number {
    return (
      this.cartLines.map((x) => x.quantity).reduce((a, v) => (a += v), 0) * 2
    );
  }
}
