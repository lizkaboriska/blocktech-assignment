import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAppDispatch } from '../../../app/hooks';
import {
  createOrder,
  Side,
  Order,
  Currency
} from '../ordersSlice';

import styles from './Orders.module.css';

const currencies = [
  {
    value: Currency.USD,
    label: '$',
  },
  {
    value: Currency.BTC,
    label: '฿',
  },
];

const defaultValues: Order = {
  currencyFrom: Currency.BTC,
  currencyTo: Currency.USD,
  price: 0,
  size: 0,
  side: Side.BUY,
};

export function CreateOrder() {
  const [formValues, setFormValues] = useState<Order>(defaultValues)
  const dispatch = useAppDispatch();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleBtnClick = () => {
    dispatch(createOrder(formValues));
    setFormValues(defaultValues);
  }

  return (
    <div className={styles.createOrder}>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Create Order
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div className={styles.formItemsContainer}>
        <TextField
          id="price-input"
          name="price"
          label="Price"
          type="number"
          value={formValues.price}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField 
          id="size-input"
          name="size"
          label="Size"
          type="number"
          value={formValues.size}
          onChange={handleInputChange}
          fullWidth
        />

        <FormControl>
          <RadioGroup
            name="side"
            value={formValues.side}
            onChange={handleInputChange}
            row
          >
            <FormControlLabel
              key="buy"
              value={Side.BUY}
              control={<Radio size="small" />}
              label="Buy"
            />
            <FormControlLabel
              key="sell"
              value={Side.SELL}
              control={<Radio size="small" />}
              label="Sell"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id="outlined-select-currency"
          select
          name='currencyFrom'
          label="From"
          value={formValues.currencyFrom}
          onChange={handleInputChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          name='currencyTo'
          label="To"
          value={formValues.currencyTo}
          onChange={handleInputChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
      </Box>
      <Button variant="contained" onClick={handleBtnClick}>Place order!</Button>
    </div>
  );
}


