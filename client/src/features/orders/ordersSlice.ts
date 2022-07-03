import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
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
  async (order: Order, {dispatch}) => {
    await addOrder(order);
    dispatch(getOrders());
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
  },
});

export const ordersSelector = (state: RootState) => state.orders.orders;

export default ordersSlice.reducer;
