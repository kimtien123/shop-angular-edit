import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Observable, of, from as fromPromise } from "rxjs";
import { catchError, switchMap, tap, map } from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Order } from "../../../models/order.model";

import { MessageService } from "../../../messages/message.service";
import { AuthService } from "../../shared/auth.service";
import { take } from "rxjs-compat/operator/take";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  public order: any;
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private store: AngularFireDatabase
  ) {}
  private log(message: string) {
    this.messageService.add("OrderService: " + message);
  }
  orderSelected = new EventEmitter<Order>();
  public getOrders() {
    return this.authService.user.pipe(
      switchMap((user) => {
        if (user) {
          const remoteUserOrders = `/orders`;
          return this.store
            .list(remoteUserOrders, (ref) =>
              ref.orderByChild("user").equalTo(user.uid)
            )
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public getOrderById(index: number): Observable<Order> | any {
    return this.getAllOrders().subscribe((items) => {
      console.log(items[index]);
    });
  }
  public getAllOrders() {
    return this.authService.user.pipe(
      switchMap((user) => {
        if (user) {
          const remoteUserOrders = `/orders`;
          return this.store.list(remoteUserOrders).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  public addUserOrder(order: Order, total: number, user: string) {
    const orderWithMetaData = {
      ...order,
      ...this.constructOrderMetaData(order),
      total,
      user
    };

    const databaseOperation = this.store
      .list(`/orders`)
      .push(orderWithMetaData)
      .then(
        (response) => response,
        (error) => error
      );

    return fromPromise(databaseOperation);
  }

  public addAnonymousOrder(order: Order, total: number) {
    const orderWithMetaData = {
      ...order,
      ...this.constructOrderMetaData(order),
      total
    };

    const databaseOperation = this.store
      .list("/orders")
      .push(orderWithMetaData)
      .then(
        (response) => response,
        (error) => error
      );

    return fromPromise(databaseOperation);
  }

  private constructOrderMetaData(order: Order) {
    return {
      number: (Math.random() * 10000000000).toString().split(".")[0],
      date: new Date().toString(),
      status: "In Progress",
    };
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messageService.addError(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public updateStatusOrder(index: string, newStatus: string) {
    return this.store.list('/orders', ref => ref.orderByChild('number').equalTo(index)).snapshotChanges()
    .subscribe(actions => {
        actions.forEach(action => {
          // here you get the key
          console.log(action.key);
          this.store.list('/orders').update(action.key, { status: newStatus });
        });
    });
  }
}
