import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
  Form, 
  FormGroup, 
  FormControl, 
  Button 
} from "react-bootstrap";
import './SearchBox.scss';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.addStock = this.addStock.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  addStock() {
    this.props.addStock(this.state.value);
    this.setState({
      value: ''
    })
  }

  handleInputChange(event) {
    return this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <form>
        <FormGroup>
          <FormControl 
            type="text" 
            value={this.state.value} 
            onChange={this.handleInputChange}
            placeholder="Enter Stock Code" 
          />
          <Button 
            className="search-icon"
            onClick={this.addStock}>
            ADD
          </Button>
        </FormGroup>
      </form>
    );
  }
}

SearchBox.propTypes = {
  addStock: PropTypes.func.isRequired,
};

export default SearchBox;
