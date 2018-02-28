import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import highcharts from 'highcharts/highstock.src';


import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
  }

  /**
   * Wrapper method to get JSON data before rendering the view.
   */
  componentDidMount() {
    // $.getJSON('https://www.highcharts.com/samples/data/aapl-c.json', function (data) {
    //   // Create the chart
    //   highcharts.stockChart('container', {
    //       rangeSelector: {
    //           selected: 1
    //       },
    //       title: {
    //           text: 'AAPL Stock Price'
    //       },
    //       series: [{
    //           name: 'AAPL',
    //           data: data,
    //           tooltip: {
    //               valueDecimals: 2
    //           }
    //       }]
    //   });
    // });
    console.log("Component has been rendered");
  }
  
  
  render() {
    return (
      <div id="container" />
    );
  }
}
export default App;
