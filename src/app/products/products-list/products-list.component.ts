import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  pager;
  message: string = null
  errorMessage: string;


  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((data) => this.loadPage(data.page || 1));

  }

  loadPage(page) {
    this.productService.getByPage(page).subscribe((data) => {
      this.pager = data['pager'];
      this.products = data['productsPage'];
    }, (error) => (this.errorMessage = error.message || 'Something went wrong please try again')
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe((data) => this.message = `Product with name ${product.name} is successfully added to the cart!`

    );
  }
}
