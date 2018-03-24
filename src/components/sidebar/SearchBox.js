import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Form, 
  FormGroup, 
  FormControl, 
  Button 
} from "react-bootstrap";
// import './SearchBox.scss';

const SearchBox = ({addStock, handleInputChange, stockCode}) => {

  // console.log('Properties received in search box are : ' );
  return (
    <form>
      <FormGroup>
        <FormControl 
          type="text" 
          value={stockCode} 
          onChange={handleInputChange}
          placeholder="Enter Stock Code" 
        />
        <Button 
          className="search-icon"
          onClick={addStock}>
          ADD
        </Button>
      </FormGroup>
    </form>
  );
};

SearchBox.propTypes = {
  addStock: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  stockCode: PropTypes.string.isRequired 
};

export default SearchBox;
