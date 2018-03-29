import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeStock } from '../../../actions/stockActions';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';
import * as actions from '../../../utils/stockDataHandler'
import './StockListItem.scss';

const StockListItem = ({stock}) => {
  const stockName = actions.formattedStockName(stock.dataset.name);
  const stockCode = stock.dataset.datset_code;
  const currentValue = actions.currentClosingValue(stock.dataset.data);
  const priceChange = actions.currentPriceChange(stock.dataset.data);
  const percentChange = actions.dailyPercentChange(stock.dataset.data);
  const lastUpdateDate = actions.lastUpdateDate(stock.dataset.newest_available_date);
  const lastUpdateTime = actions.lastUpdateTime(stock.dataset.refreshed_at);
  const previousClose = actions.previousClosingValue(stock.dataset.data);
  
  return (
    <ListGroupItem>
      <div className="item-container">

        <div className="tab">
          <Glyphicon glyph="remove" />
        </div>

        <div className="stock-data-container">
          <span className="stock-name">
            {stockName}
          </span>

          <div className="stock-data-stuff">
            <h3 className="stock-data price">
              <sup className="currency">$</sup>
              {currentValue}
            </h3>
            <Glyphicon glyph="triangle-bottom" />
            {priceChange}
            {percentChange}%
            
            <div className="intraday__timestamp">
              <span className="timestamp__time">Last Updated: {lastUpdateDate} {lastUpdateTime} </span>
            </div>

            <div className="intraday__close">
              Previous close:
                {previousClose}
            </div>
          </div>
        </div>
      </div>
      
    </ListGroupItem>
  );
};

StockListItem.propTypes = {
  stock: PropTypes.object.isRequired,
};

export default StockListItem;
