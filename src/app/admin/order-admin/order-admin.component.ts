import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { OrderService } from '../../account/orders/shared/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.scss'],
  providers: [OrderService]
})
export class OrderAdminComponent implements OnInit {
  public orders: Order[];
  private ordersSubscription: Subscription;

  constructor(public orderService: OrderService) {}
  ngOnInit(): void {
    this.ordersSubscription = this.orderService
      .getAllOrders()
      .subscribe((orders: Order[]) => {
        if (orders) {
          this.orders = orders.reverse();
        }
      });
  }

}
