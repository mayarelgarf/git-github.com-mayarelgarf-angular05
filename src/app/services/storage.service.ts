import { Injectable } from '@angular/core';
import { CartLine } from '../interfaces/cart-line';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getProductsFromLocalStorage(): Product[] {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }
  addProducts(product: Product, quantity: number) {
    const products: Product[] = this.getProductsFromLocalStorage();
    for (let i = 0; i < quantity; i++) {
      products.push(product);
    }
    localStorage.setItem('products', JSON.stringify(products));
  }

  getCartLines(): CartLine[] {
    const products: Product[] = this.getProductsFromLocalStorage();
    const cartLines: CartLine[] = [];
    products.forEach((p) => {
      const ix = cartLines.findIndex((x) => x.product._id === p._id);
      if (ix >= 0) {
        cartLines[ix].quantity += 1;
      } else {
        cartLines.push({
          price: p.price,
          product: p,
          quantity: 1,
        });
      }
    });
    return cartLines;
  }
  save(cartLines: CartLine[]) {
    const products: Product[] = [];
    cartLines.forEach((c) => {
      for (let i = 0; i < c.quantity; i++) {
        products.push(c.product);
      }
    });
    localStorage.setItem('products', JSON.stringify(products));
  }

  getQuantity(): number {
    const products = this.getProductsFromLocalStorage();
    return products?.length || 0;
  }
}
