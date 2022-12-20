import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    public storageService: StorageService,
    public authService: AuthService,
    private router: Router
  ) {}

  search: string = '';
  productSearch() {
    this.router.navigate([`/shop` ],{ queryParams: { search: this.search } });
  }
  signOut() {
    this.authService.signOut();
  }
}
