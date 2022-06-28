import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  getOrders,
  ordersSelector,
  Side,
  Order
} from '../ordersSlice';

import styles from './Orders.module.css';


export function Orders() {
  const orders = useAppSelector(ordersSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [])

  return (
    <div className={styles.tablesContainer}>
      <OrdersTable name={Side.BUY} orders={orders.filter(({side}) => side === Side.BUY)} />
      <OrdersTable name={Side.SELL} orders={orders.filter(({side}) => side === Side.SELL)} />
    </div>
  );
}

interface OrdersTableProps {
  orders: Order[];
  name: string;
}
export function OrdersTable({orders, name}: OrdersTableProps) {
  return (
      <TableContainer component={Paper} sx={{ width: 500 }}>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {name}
        </Typography>
      <Table sx={{ width: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>price</TableCell>
            <TableCell align="right">size</TableCell>
            <TableCell align="right">currencyFrom</TableCell>
            <TableCell align="right">currencyTo</TableCell>
            <TableCell align="right">side</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.price}
              </TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">{row.currencyFrom}</TableCell>
              <TableCell align="right">{row.currencyTo}</TableCell>
              <TableCell align="right">{row.side}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


