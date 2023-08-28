import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  pager;
  errorMessage: string
  // pageOfItems=[];

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe((data) => this.loadPage(data.page || 1));

  }

  loadPage(page) {
    this.orderService.getByPage(page).subscribe((data) => {
      this.pager = data['pager'];
      this.orders = data['ordersPage'];
    }
      , (error) => (this.errorMessage = error.message || 'Something went wrong please try again')
    );
  }


}
