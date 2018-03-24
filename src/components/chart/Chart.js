import React, { Component } from 'react';
import Highstock from 'react-highcharts/ReactHighstock.src';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Chart.scss';

class StockChart extends Component {
  constructor (props) {
    super(props);
    this.state = {     
      config: {
        rangeSelector: {
          selected: 1
        },
        title: {
          text: 'Stocks'
        },
        subtitle: {
          text: 'some info'
        },
        yAxis: {
          labels: {
            align: 'left',
            x: 3,
            y: 16,
            format: '{value:.,0f}'
          },
          showFirstLabel: false,
          type: 'linear',
          gridLineWidth: 1
        },
        xAxis: {
          type: 'datetime',
          gridLineWidth: 1
        },
        series: props.stocks, 
      }
    };
  }

  componentWillMount() {
    console.log('Chart not mounted yet');
    debugger;

    this.setState({
      config: {
        rangeSelector: {
          selected: 1
        },
        title: {
          text: 'Stocks'
        },
        subtitle: {
          text: 'some info'
        },
        series: this.props.stocks, 
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('Chart received updates');
    debugger;

    let stocks = getRequiredStockProps(nextProps.stocks);

    this.setState({
      config: {
        rangeSelector: {
          selected: 1
        },
        title: {
          text: 'Stocks'
        },
        subtitle: {
          text: 'some info'
        },
        yAxis: {
          labels: {
            align: 'left',
            x: 3,
            y: 16,
            format: '{value:.,0f}'
          },
          showFirstLabel: false,
          type: 'linear',
          gridLineWidth: 1
        },
        xAxis: {
          type: 'datetime',
          gridLineWidth: 1
        },
        series: stocks
      }
    });
  }

  render() {  
    return (
      <div className="chart-container">
        <Highstock config={this.state.config} />
      </div>
    );
  }
}

StockChart.propTypes = {
  stocks: PropTypes.array.isRequired
};

function getRequiredStockProps(stocks) {
  console.log('filtering unwanted props');
  debugger;

  if(!stocks) {
    return null;
  }

  return stocks.map(stock => {
    return {
      name: stock.dataset.dataset_code,
      data: stock.dataset.data
    };
  });
}

function mapStateToProps(state) {
  let stockData = getRequiredStockProps(state.stocks);
  debugger;
  return {
    stocks: stockData
  };
}

export default connect(mapStateToProps)(StockChart);
