import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeStock } from '../../../actions/stockActions';

import { ListGroupItem } from 'react-bootstrap';

const StockListItem = ({code, name}) => {
  return (
    <ListGroupItem>
      {code}
    </ListGroupItem>
  );
};

StockListItem.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default StockListItem;
