import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  filter: any = {
    prices: [{ min: 0, max: 0 }],
    sizes: [''],
    colors: [''],
  };
  filterString: string = '';

  pageNumber: number = 0;
  itemsPerPage: number = 10;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.data;
    });

    this.route.queryParams.subscribe((params) => {
      this.filterString = params['search'];
    });
  }

  getFilteredProducts(): Product[] {
    return this.products.filter(
      (p) =>
        this.filterPrice(p) &&
        this.filterSize(p) &&
        this.filterColor(p) &&
        this.filterByName(p)
    );
  }
  getProducts(): Product[] {
    return this.getFilteredProducts().slice(
      this.pageNumber * this.itemsPerPage,
      this.pageNumber * this.itemsPerPage + this.itemsPerPage
    );
  }

  getTotalCount() {
    return this.getFilteredProducts().length;
  }
  filterChange(filter: any) {
    this.filter = filter;
  }

  filterPrice(p: Product) {
    return (
      this.filter.prices.findIndex(
        (x: any) =>
          (x.min <= p.price && x.max >= p.price) || (x.min == 0 && x.max == 0)
      ) >= 0
    );
  }
  filterSize(p: Product) {
    if (this.filter.sizes.includes('')) return true;
    return this.filter.sizes.includes(p.size);
  }
  filterColor(p: Product) {
    if (this.filter.colors.includes('')) return true;
    return this.filter.colors.includes(p.color);
  }

  filterByName(p: Product) {
    return (
      !this.filterString ||
      p.name?.toLowerCase().indexOf(this.filterString.toLowerCase()) >= 0
    );
  }
  changePage(i: number) {
    this.pageNumber = i;
  }
}
