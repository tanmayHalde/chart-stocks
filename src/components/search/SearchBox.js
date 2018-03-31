import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addStock } from '../../actions/stockActions';
import { bindActionCreators } from 'redux';
import { getStockCodesFromProps, isStockPresent } from '../../utils/stockDataHandler';

import {
  Form, 
  FormGroup, 
  FormControl, 
  Button, 
  Glyphicon
} from "react-bootstrap";
import './SearchBox.scss';
import toastr from 'toastr';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.addStock = this.addStock.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.verifyInputAndAddStock = this.verifyInputAndAddStock.bind(this);
  }

  addStock(stockCode) {
    this.props.addStock(stockCode, this.props.socket)
      .then(() => {
        toastr.success('Stock added');
        this.setState({
          value: ''
        });
      })
      .catch(err => {
        toastr.warning('Stock code not found');
      });
  }

  isInputBlank() {
    return this.state.value.length < 1;
  }

  handleInputChange(e) {
    return this.setState({
      value: e.target.value
    });
  }

  verifyInputAndAddStock(e) {
    e.preventDefault();
    const stockCode = this.state.value;

    if (this.isInputBlank()) {
      toastr.warning('Enter valid code !');
    } else if (isStockPresent(this.props.stocks, stockCode)) {
      toastr.warning('Stock already exists !');
    } else {
      this.addStock(stockCode);
    }
  }

  render() {
    return (
      <div className="searchbox-container row">
        <Form onSubmit={this.verifyInputAndAddStock}>
          <FormGroup className="col-xs-8 col-md-4 col-md-offset-4">
            <FormControl
              type="text" 
              value={this.state.value}
              placeholder="Enter Stock Code"
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <Button 
            type="button"
            className="search-button col-xs-2 col-md-1"
            onClick={this.verifyInputAndAddStock}
            disabled={this.isInputBlank()}
            bsStyle="primary"
          >
            <Glyphicon glyph="plus" />
          </Button>
        </Form>
      </div>
      
    );
  }
}

SearchBox.propTypes = {
  addStock: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  stocks: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  let stockCodes = getStockCodesFromProps(state.stocks)

  return {
    stocks: stockCodes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addStock: bindActionCreators(addStock, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
