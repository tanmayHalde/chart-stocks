import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { removeStock } from '../../actions/stockActions';
import StockList from './StockList';

import './ListContainer.scss';

class StockListContainer extends Component {
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

  removeStock(event) {
    const code = event.target.id;
    this.props.removeStock(code, this.props.socket);
    toastr.warning('Stock removed');
  }

  render() {
    return (
      <div className="sidebar-container">
        <StockList
          items = {this.state.stocks}
          removeStock = {this.removeStock}
        />
      </div>
    );
  }
}

StockListContainer.propTypes = {
  stocks: PropTypes.array.isRequired,
  removeStock: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(StockListContainer);