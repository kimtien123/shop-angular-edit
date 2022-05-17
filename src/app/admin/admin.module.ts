import { NgModule } from '@angular/core';
import { AddEditComponent } from './add-edit/add-edit.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from '../products/products.module';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
    declarations: [
        AddEditComponent,
        OrderListComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ProductsModule
    ],
    exports: [
        SharedModule,
        ProductsModule
    ]
})
export class AdminModule {}
