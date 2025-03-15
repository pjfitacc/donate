import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const products = [
  {
    name: 'No preference. Let PJF decide for me.',
    price: '10.00',
  },
  // {
  //   "name": "Philippine Jesuits' Aged and Infirm Fund (for our Sick and Senior Jesuits)",
  //   "price": "10.00"
  // },
  // {
  //   "name": "Philippine Jesuits' Formation Fund (for the Education and Support of our Young Jesuits)",
  //   "price": "10.00"
  // },
  // {
  //   "name": "Philippine Jesuits' Apostolate Fund (for our Works and Ministries)",
  //   "price": "10.00"
  // },
  // {
  //   "name": "Ateneo de Manila University",
  //   "price": "10.00"
  // },
  // {
  //   "name": "Ateneo de Davao University",
  //   "price": "10.00"
  // },
  // {
  //   "name": "Ateneo de Naga University",
  //   "price": "10.00"
  // },
  // {
  //   "name": "Ateneo de Zamboanga University",
  //   "price": "10.00"
  // },
  // {
  //   "name": "Xavier University",
  //   "price": "10.00"
  // },
  // {
  //   "name": "San Jose Seminary",
  //   "price": "10.00"
  // },
  // {
  //   "name": "Jesuit Volunteers Philippines",
  //   "price": "10.00"
  // },
  // {
  //   "name": "Philippine Jesuit Prison Service",
  //   "price": "10.00"
  // },
  // {
  //   "name": "Tanging Yaman Foundation",
  //   "price": "10.00"
  // }
];

function Info({ totalPrice }) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Donation Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
