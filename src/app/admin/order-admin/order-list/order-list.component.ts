import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { OrderService } from "../../../account/orders/shared/order.service";
import { Order } from "../../../models/order.model";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"],
})

export class OrderListComponent implements OnInit {
  orderList: Order[];
  p: number = 1;
  private ordersSubscription: Subscription;
  productsLoading: boolean;
  constructor(public orderService: OrderService) {}

  ngOnInit(): void {
    this.ordersSubscription = this.orderService
      .getAllOrders()
      .subscribe((orders: Order[]) => {
        if (orders) {
          this.productsLoading = true;
          this.orderList = orders;
        }
      });
  }
}
