import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeStock } from '../../../actions/stockActions';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';
import { getStockItemProperties } from '../../../utils/stockDataHandler';
import './StockListItem.scss';

const StockListItem = ({stock, remove}) => {
  const item = getStockItemProperties(stock);

  return (
    <div className="list-item">
      <div className="item-tab">
   
      <div className="remove-button">
        <button 
          name={item.stockCode}
          onClick={remove}>

          <Glyphicon        
            glyph="remove"
            id={item.stockCode}
            title={item.stockCode}
          /> 
        </button>
      </div>

    </div>

      <div className="item-info">
        <div className="stock-name">
          {item.stockName}
        </div>

        <div className="current-value">
          <h3>
            <sup className="currency">$ </sup>
            {item.currentValue}
          </h3>
                  
          <div className={`daily-variation ${item.variation}`}>
            { item.priceChange < 0 ? (
                <Glyphicon glyph="triangle-bottom" />
              ) : (
                <Glyphicon glyph="triangle-top" />
              )
            }
            <span className="amount-change"> {item.priceChange} </span>
            <span className="percent-change"> {item.percentChange}% </span>
          </div>
        </div>

        <div className="last-update">
          <p>
            <i> Last Updated: {item.lastUpdated} </i>
          </p>
        </div>

        <div className="last-close">
          <p> Previous close: {item.previousClose} </p>
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
