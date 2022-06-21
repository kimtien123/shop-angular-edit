import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./core/home/home.component";
import { CartComponent } from "./cart/cart.component";
import { AddEditComponent } from "./admin/add-edit/add-edit.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AdminGuard } from "./admin/shared/admin.guard";
import { CheckoutComponent } from "./checkout/checkout.component";
import { RegisterLoginComponent } from "./account/register-login/register-login.component";
import { OrdersComponent } from "./account/orders/orders.component";
import { ProfileComponent } from "./account/profile/profile.component";
import { AccountComponent } from "./account/account.component";
import { ProductsListComponent } from "./products/products-list/products-list.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { CompleteComponent } from "./checkout/complete/complete.component";
import { OrderAdminComponent } from "./admin/order-admin/order-admin.component";
import { OrderDetailComponent } from "./admin/order-admin/order-detail/order-detail.component";
import { AddEditCategoryComponent } from './admin/category/add-edit/add-edit.component';
import { CategoryListComponent } from './admin/category/category-list.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductsListComponent },
  { path: "products/:id", component: ProductDetailComponent },
  { path: "cart", component: CartComponent },
  { path: "admin/add", component: AddEditComponent, canActivate: [AdminGuard] },
  { path: "admin/category/add", component: AddEditCategoryComponent, canActivate: [] },
  { path: "admin/category/list", component: CategoryListComponent, canActivate: [] },
  {
    path: "admin/edit/:id",
    component: AddEditComponent,
    canActivate: [AdminGuard],
  },
  {
    path: "admin/category/edit/:id",
    component: AddEditCategoryComponent,
    canActivate: [],
  },
  {
    path: "order-admin",
    component: OrderAdminComponent,
    children: [{ path: ":id", component: OrderDetailComponent }],
  },
  { path: "checkout", component: CheckoutComponent },
  { path: "register-login", component: RegisterLoginComponent },
  {
    path: "account",
    component: AccountComponent,
    children: [
      { path: "", redirectTo: "profile", pathMatch: "full" },
      { path: "orders", component: OrdersComponent },

      { path: "profile", component: ProfileComponent },
    ],
  },
  { path: "order-complete", component: CompleteComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard],
})
export class AppRoutingModule {}
