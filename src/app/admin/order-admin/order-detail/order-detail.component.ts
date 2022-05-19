import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { OrderService } from "../../../account/orders/shared/order.service";
import { MessageService } from "../../../messages/message.service";
import { Subscription } from 'rxjs/Subscription';
import { Order } from "../../../models/order.model";
@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
  @Input() public order: any;
  private orderSubscription: Subscription;
  id: number;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private log: MessageService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.orderSubscription = this.orderService.getAllOrders().subscribe((items) => {
        this.order = items[this.id];
      });
    });
    
  }

  onUpdateStatus(index: number, newStatus: string) {
    this.orderSubscription.unsubscribe();
    this.orderService.updateStatusOrder(index, newStatus);
  }
}
