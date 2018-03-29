import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StockListItem from './StockListItem/StockListItem';

import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import './StockList.scss';

const StockList = ({items, removeStock}) => {
  let listItems = items.map((stock, index) => {
    return (
      <div
        key={stock.dataset.dataset_code}
        className="item-wrapper"
      >
        <StockListItem
          stock={stock}
        />
        <Button
          id={stock.dataset.dataset_code}
          onClick={removeStock}> 
          X
        </Button>
      </div>
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
  removeStock: PropTypes.func.isRequired
};

export default StockList;
