import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-products-pagination',
  templateUrl: './products-pagination.component.html',
  styleUrls: ['./products-pagination.component.css'],
})
export class ProductsPaginationComponent {
  @Input() totalCount: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 0;
  @Output() currentPageChange = new EventEmitter<number>();

  getPagesCount(): number {
    return Math.ceil(this.totalCount / this.itemsPerPage);
  }

  changePage(i:number){
    this.currentPage = i;
    this.currentPageChange.emit(i);
  }
}
