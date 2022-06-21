import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { CategoryService } from '../../account/category/shared/category.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  UserList: User[];
  p: number = 1;
  private ordersSubscription: Subscription;
  productsLoading: boolean;
  constructor(public categoryService: CategoryService) {}

  ngOnInit(): void {
    this.ordersSubscription = this.categoryService
      .getUsers()
      .subscribe((user: User[]) => {
        if (user) {
          this.productsLoading = true;
          this.UserList = user;
        }
      });
  }

}
