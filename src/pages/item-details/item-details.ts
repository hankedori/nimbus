import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import { Item } from '../../models/item';
import { CartService } from '../../providers/cart/cart';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: Item;
  quantity: number;
  quantityLabel: string;
  itemPrice: number;
  dynamicSlider: boolean;
  slideOptions = {
    pager: true,
    loop: true
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public cartService: CartService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.selectedItem.retailer_name = navParams.get('dispensaryName');

    this.itemPrice = this.selectedItem.prices[0];
    this.quantityLabel = this.selectedItem.price_labels[0];

    this.dynamicSlider = this.selectedItem.prices.length > 1 ? true : false;
    this.quantity = this.dynamicSlider ? 0 : 1;
  }

  addToCart(selectedItem, quantity) {
    if (this.dynamicSlider == true) {
      this.cartService.addToCart(this.selectedItem.retailer_name, selectedItem, selectedItem.price_labels[quantity], selectedItem.prices[quantity]);
    } else {
      this.cartService.addToCart(this.selectedItem.retailer_name, selectedItem, quantity, quantity * this.itemPrice);
    }
    this.presentAddToCartToast(selectedItem);
    this.navCtrl.pop();
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }

  presentAddToCartToast(selectedItem) {
    let toast = this.toastCtrl.create({
      message: selectedItem.name + ' has been added to your cart.',
      duration: 3000
    });
    toast.present();
  }
}