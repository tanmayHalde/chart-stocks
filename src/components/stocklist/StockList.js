import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeStock } from '../../actions/stockActions';
import { isStockListEmpty } from '../../utils/stockDataHandler';
import StockListItem from './listItem/StockListItem';
import { ListGroup } from 'react-bootstrap';
import './StockList.scss';
import { LIST_EMPTY_STATUS } from '../../actions/statusTypes';

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
    this.props.removeStock(code);
  }

  render() {
    let content = isStockListEmpty(this.state.stocks) ? (
      <div className="empty-list-status text-muted"> {LIST_EMPTY_STATUS} </div>
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