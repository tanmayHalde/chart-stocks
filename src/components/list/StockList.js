import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { removeStock } from '../../actions/stockActions';
import { isStockListEmpty } from '../../utils/stockDataHandler';
import './StockList.scss';

import StockListItem from './listItem/StockListItem';
import { ListGroup } from 'react-bootstrap';


class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: props.stocks
    };
    this.removeStock = this.removeStock.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stocks: nextProps.stocks
    });
  }

  getListItems() {
    let stockList = this.state.stocks;
    return stockList.map((stock, index) => {
      return (
        <StockListItem
          key={stock.dataset.dataset_code}
          stock={stock}
          remove={this.removeStock}
        />
      );
    });
  }

  removeStock(event) {
    const code = event.target.id;
    this.props.removeStock(code, this.props.socket);
    toastr.warning('Stock removed');
  }

  render() {
    let content = isStockListEmpty(this.state.stocks) ? (
      <div className="empty-list-status text-muted"> No data </div>
    ) : (
      this.getListItems()
    );

    return (
      <ListGroup>
        <div className="list-group-content">
          {content}
        </div>
      </ListGroup>
    );
  }
}

StockList.propTypes = {
  removeStock: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  stocks: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    stocks: state.stocks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeStock: bindActionCreators(removeStock, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList);