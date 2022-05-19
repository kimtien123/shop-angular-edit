import { CartItem } from './cart-item.model';
import { Customer } from './customer.model';

export class Order {
  constructor(
    public customer: Customer = null,
    public id: number = 1,
    public items: CartItem[] = null,
    public total: number = null,
    public status: string = '',
    public numberOrder: string = '',
    public date: string = new Date().toISOString().split('T')[0],
    public shippingMethod: string = '',
    public paymentMethod: string = '',
    public user: string = ''
  ) {}
}
