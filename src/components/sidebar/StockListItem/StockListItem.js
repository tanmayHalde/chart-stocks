import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeStock } from '../../../actions/stockActions';

import { ListGroupItem } from 'react-bootstrap';

const StockListItem = ({code, name, removeItem}) => {
  return (
    <ListGroupItem>
      <div>
        {code}
        <button onClick = {removeItem}> 
          X
        </button>
      </div>
    </ListGroupItem>
  );
};

StockListItem.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default StockListItem;
