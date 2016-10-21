import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "node_modules/rxjs/Observable";

import { Item } from '../../models/item';
import { Order } from '../../models/order';
import { AuthenticationService } from '../../providers/authentication/authentication';

import _ from 'underscore';

@Injectable()
export class OrderService {
  orders: Order[];

  constructor(public http: Http,
              public auth: AuthenticationService) {
  }

  loadOrders(): Observable {
    return this.auth.get('orders');
  }

  placeOrder(order: Order): Observable {
    order.retailer_id = order.order_details[0].retailer_id;
    order.status = "NEW";

    let body = JSON.stringify(order);
    return this.auth.post('orders', body);
  }
}