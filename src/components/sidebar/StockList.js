import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StockListItem from './StockListItem/StockListItem';

import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './StockList.scss';

const StockList = ({items, removeItem}) => {
  let listItems = items.map((stock, index) => {
    return (
      <StockListItem 
        key={stock.code}
        code={stock.code}
        name={stock.name}
        removeItem={removeItem}
      />
    );
  });
  return (
    <ListGroup>
      {listItems}
    </ListGroup>
  );
};

StockList.propTypes = {
  items: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default StockList;
