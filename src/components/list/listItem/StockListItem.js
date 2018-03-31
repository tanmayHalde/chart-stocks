import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeStock } from '../../../actions/stockActions';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';
import * as actions from '../../../utils/stockDataHandler';
import './StockListItem.scss';

const StockListItem = ({stock, remove}) => {
  const stockName = actions.formattedStockName(stock.dataset.name);
  const stockCode = stock.dataset.dataset_code;
  const currentValue = actions.currentClosingPrice(stock.dataset.data);
  const priceChange = actions.currentPriceChange(stock.dataset.data);
  const percentChange = actions.dailyPercentChange(stock.dataset.data);
  const lastUpdateDate = actions.lastUpdateDate(stock.dataset.newest_available_date);
  const lastUpdateTime = actions.lastUpdateTime(stock.dataset.refreshed_at);
  const previousClose = actions.previousClosingPrice(stock.dataset.data);
  const variation = priceChange > 0 ? 'positive' : 'negative';
 
  debugger;
  return (
    <div className="list-item">
      <div className="item-tab">
   
      <div className="remove-button">
        <button 
          name={stockCode}
          onClick={remove}>

          <Glyphicon        
            glyph="remove"
            id={stockCode}
            title={stockCode}
          /> 
        </button>
      </div>

    </div>

      <div className="item-info">
        <div className="stock-name">
          {stockName}
        </div>

        <div className="current-value">
          <h3>
            <sup className="currency">$ </sup>
            {currentValue}
          </h3>
                  
          <div className={`daily-variation ${variation}`}>
            { priceChange < 0 ? (
                <Glyphicon glyph="triangle-bottom" />
              ) : (
                <Glyphicon glyph="triangle-top" />
              )
            }
            <span className="amount-change"> {priceChange} </span>
            <span className="percent-change"> {percentChange}% </span>
          </div>
        </div>

        <div className="last-update">
          <p>
            <i> Last Updated: {lastUpdateDate} {lastUpdateTime} </i>
          </p>
        </div>

        <div className="last-close">
          <p> Previous close: {previousClose} </p>
        </div>
      </div>   
    </div>
  );
};

StockListItem.propTypes = {
  stock: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired
};

export default StockListItem;
