import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
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
    this.addNewStock = this.addNewStock.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  addNewStock(e) {
    e.preventDefault();
    if (!this.inputExists()) {
      toastr.warning('Enter valid code !')
    } else {
      this.props.addStock(this.state.value);
      this.setState({
        value: ''
      });
    }
  }

  handleInputChange(e) {
    return this.setState({
      value: e.target.value
    });
  }

  inputExists() {
    return this.state.value.length > 0;
  }

  render() {
    return (
      <form onSubmit={this.addNewStock}>
        <FormGroup>
          <FormControl 
            type="text" 
            value={this.state.value}
            placeholder="Enter Stock Code"
            onChange={this.handleInputChange}
          />
          <Button 
            className="search-icon"
            onClick={this.addNewStock}
            type="button"
            disabled={!this.inputExists()}>
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
