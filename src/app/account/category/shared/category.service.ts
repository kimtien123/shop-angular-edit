import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Observable, of, from as fromPromise } from "rxjs";
import { catchError, switchMap, tap, map } from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Order } from "../../../models/order.model";

import { MessageService } from "../../../messages/message.service";
import { AuthService } from "../../shared/auth.service";
import { Category } from '../../../models/category.model';
import { Product } from '../../../models/product.model';
import { User } from "../../../models/user.model";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  public order: any;
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private store: AngularFireDatabase,
    private angularFireDatabase: AngularFireDatabase,
  ) {}
  private log(message: string) {
    this.messageService.add("CategoryService: " + message);
  }
  orderSelected = new EventEmitter<Order>();
  public getCategories() {
    return this.angularFireDatabase
        .list<Category>('/categories', (ref) => ref.orderByChild('date'))
        .valueChanges()
        .pipe(map((arr) => arr.reverse()), catchError(this.handleError<Category[]>(`getCategories`)));
  }

  public getUsers() {
    return this.angularFireDatabase
        .list<User>('/users', (ref) => ref.orderByChild('email'))
        .valueChanges()
        .pipe(map((arr) => arr.reverse()), catchError(this.handleError<User[]>(`getUsers`)));
  }

  public addCategory(category: Category) {
    console.log('categorycategory', category);
    const databaseOperation = this.store
      .list(`/categories`)
      .push(category)
      .then(
        (response) => response,
        (error) => error
      );

    return fromPromise(databaseOperation);
  }

  public updateCategory(category: Category) {
    const url = `${'/categories'}/${category.id}`;
    return fromPromise(this.store
        .object<Category>(url)
        .update(category).then(
            (response) => response,
            (error) => error
        ));
  }

  public getCategory(id: any): Observable<Category | null> {
    const url = `${'/categories'}/${id}`;
    console.log('urlurl', url);
    return this.angularFireDatabase
        .object<Category>(url)
        .valueChanges()
        .pipe(
            tap((result) => {
              if (result) {
                return of(result);
              } else {
                this.messageService.addError(`Found no Product with id=${id}`);
                return of(null);
              }
            }),
            catchError(this.handleError<Category>(`getProduct id=${id}`))
        );
  }

  public deleteCategory(category: Category) {
    const url = `${'/categories'}/${category.id}`;

    return this.angularFireDatabase
        .object<Product>(url)
        .remove()
        .then(() => this.log('success deleting' + category.name))
        .catch((error) => {
          this.messageService.addError('Delete failed ' + category.name);
          this.handleError('delete product');
        });
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

  public updateStatusOrder(index: number, newStatus: string) {
    return this.store.list('/orders', ref => ref.orderByChild('numberOrder').equalTo(index)).snapshotChanges()
    .subscribe(actions => {
        actions.forEach(action => {
          // here you get the key
          console.log(action.key);
          this.store.list('/orders').update(action.key, { status: newStatus });
        });
    });
  }
}
