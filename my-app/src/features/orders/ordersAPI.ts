import axios from 'axios';
import { Order } from './ordersSlice';

export function fetchOrders() {
  return axios.get('/get-orders');
}

export function addOrder(order: Order) {
  return axios.post('/add-order', order);
}
