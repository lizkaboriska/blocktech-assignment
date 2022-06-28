import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { addOrder, fetchOrders } from './ordersAPI';

export enum Currency {
 BTC = 'BTC',
 USD = 'USD'
}

export enum Side {
  BUY = 'BUY',
  SELL = 'SELL'
 }

export interface Order {
  price: number,
  size: number,
  currencyFrom: Currency,
  currencyTo: Currency,
  side: Side
}

export interface OrdersState {
  orders: Order[]
}

const initialState: OrdersState = {
  orders: []
};

export const getOrders = createAsyncThunk(
  'counter/fetchOrders',
  async () => {
    const response = await fetchOrders();
    return response.data;
  }
);

export const createOrder = createAsyncThunk(
  'counter/addOrder',
  async (order: Order) => {
    const response = await addOrder(order);
    return response.data;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders = [...state.orders, action.payload];
      })
  },
});

export const ordersSelector = (state: RootState) => state.orders.orders;

export default ordersSlice.reducer;
