import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CategoryService } from '../../account/category/shared/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  categoryList: Category[];
  p: number = 1;
  private ordersSubscription: Subscription;
  productsLoading: boolean;
  constructor(public categoryService: CategoryService) {}

  ngOnInit(): void {
    this.ordersSubscription = this.categoryService
      .getCategories()
      .subscribe((categories: Category[]) => {
        if (categories) {
          this.productsLoading = true;
          this.categoryList = categories;
        }
      });
  }
}
