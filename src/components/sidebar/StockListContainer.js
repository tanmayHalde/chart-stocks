import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import toastr from 'toastr';

import SearchBox from './SearchBox';
import StockList from './StockList';
import * as stockActions from '../../actions/stockActions';
import './StockListContainer.scss';

class StockListContainer extends Component {
  constructor(props) {
    super(props);
    
    // let socket = io('https://th-stockchart.herokuapp.com/');
    let socket = io('http://localhost:3000');
    this.state = {
      stockCode: '',
      socket: socket,
      stocks: props.stocks
    };
    this.addStock = this.addStock.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.state.socket.on('connectionSuccess', () => {
			return toastr.warning('Socket connnected ');
		});
		this.state.socket.on('stockAdded', stock => {
			this.props.actions.addStock(stock);
		});
		this.state.socket.on('stockRemoved', (stock) => {
			this.props.actions.removeStock(stock);
		});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stocks: nextProps.stocks
    });
  }

  addStock() {
    this.props.actions.addStock(this.state.stockCode, this.socket)
      .then(() => {
        this.setState({
          stockCode: ''
        });
      })
      .catch(err => {
        toastr.error(err);
      });
  }

  handleInputChange(event) {
    return this.setState({
      stockCode: event.target.value
    });
  }

  removeStock(event) {
    const code = event.target.code;
    this.props.actions.removeStock(code)
      .then(() => {
        toastr.info('Stock removed');
      })
      .catch(err => {
        toastr.error(err);
      });
  }

  render() {
    return (
      <div className="sidebar-container">
        <SearchBox
          addStock = {this.addStock}
          handleInputChange = {this.handleInputChange}
          stockCode = {this.state.stockCode}
        />
        <StockList 
          items = {this.state.stocks}
          removeItem = {this.removeStock}
        />
      </div>
    );
  }
}

StockListContainer.propTypes = {
  stocks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function getRequiredStockProps(stocks) {
  return stocks.map(stock => {
    return {
      code: stock.dataset.dataset_code,
      name: stock.dataset.name
    };
  });
}

function mapStateToProps(state) {
  let stockData = getRequiredStockProps(state.stocks);
  return {
    stocks: stockData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(stockActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockListContainer);