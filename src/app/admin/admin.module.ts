import { NgModule } from '@angular/core';
import { AddEditComponent } from './add-edit/add-edit.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from '../products/products.module';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { OrderListComponent } from './order-admin/order-list/order-list.component';
import { OrderItemComponent } from './order-admin/order-list/order-item/order-item.component';
import { OrderDetailComponent } from './order-admin/order-detail/order-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [
        AddEditComponent,
        OrderListComponent,
        OrderItemComponent,
        OrderDetailComponent,
        OrderAdminComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ProductsModule,
        AppRoutingModule,
        NgxPaginationModule
    ],
    exports: [
        SharedModule,
        ProductsModule
    ]
})
export class AdminModule {}
