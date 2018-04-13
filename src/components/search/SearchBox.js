import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addStock } from '../../actions/stockActions';
import { bindActionCreators } from 'redux';
import { getStockCodesFromProps, isStockPresent } from '../../utils/stockDataHandler';

import { warning } from 'toastr';
import {
  Form, 
  FormGroup, 
  FormControl, 
  Button, 
  Glyphicon
} from "react-bootstrap";
import './SearchBox.scss';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addStockIfValid = this.addStockIfValid.bind(this);
  }

  isInputBlank() {
    return this.state.value.length < 2;
  }

  hasSpecialChars(stockCode) {
    return RegExp(/[~`!#$%^&*+=\-[\]\\';,/{}|\\".:<>?]/g).test(stockCode);
  }

  handleInputChange(e) {
    return this.setState({
      value: e.target.value
    });
  }

  addStockIfValid(e) {
    e.preventDefault();
    const stockCode = this.state.value;

    if (this.isInputBlank() || this.hasSpecialChars(stockCode)) {
      warning('Invalid stock code!');
    } else if (isStockPresent(this.props.stocks, stockCode.toUpperCase())) {
      warning('Stock already exists !');
    } else {
      this.props.addStock(stockCode);
      this.setState({
        value: ''
      })
    }
  }

  render() {
    return (
      <div className="searchbox-container row">
        <Form onSubmit={this.addStockIfValid}>
          <FormGroup className="col-xs-8 col-xs-offset-1 col-md-4 col-md-offset-4">
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
            onClick={this.addStockIfValid}
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
  stocks: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  let stockCodes = getStockCodesFromProps(state.stocks);

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
