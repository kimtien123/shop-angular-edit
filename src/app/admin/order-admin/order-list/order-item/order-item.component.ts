import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../../../account/orders/shared/order.service';
import { Order } from '../../../../models/order.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order;
  @Input() index: number;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }
}
