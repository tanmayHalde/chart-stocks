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
    };
    this.addStock = this.addStock.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  addStock() {
    this.props.addStock(this.state.value);
    this.setState({
      value: ''
    });
  }

  handleInputChange(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.addStock();
    } else {
      let newValue = this.state.value + event.key;
      return this.setState({
        value: newValue
      });
    }
 
  }

  render() {
    return (
      <form>
        <FormGroup>
          <FormControl 
            type="text" 
            value={this.state.value}
            placeholder="Enter Stock Code"
            onKeyPress={this.handleInputChange}
          />
          <Button 
            className="search-icon"
            onClick={this.addStock}
            type="button">
            ADD 
          </Button>
        </FormGroup>
      </form>
    );
  }
}

SearchBox.propTypes = {
  addStock: PropTypes.func.isRequired
};

export default SearchBox;
