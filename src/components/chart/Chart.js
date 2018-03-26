import React, { Component } from 'react';
import Highstock from 'react-highcharts/ReactHighstock.src';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as stockDataHandler from '../../utils/stockDataHandler';

import chartConfig from './config';
import './Chart.scss';

class Chart extends Component {
  constructor (props) {
    super(props);
    this.state = {     
      config: chartConfig
    };
  }

  componentWillReceiveProps(nextProps) {
    stockDataHandler.getRequiredStockProps(nextProps.stocks)
      .then(formattedStockData => {
        let newConfig = Object.assign({}, this.state.config);
        newConfig.series = formattedStockData;

        this.setState({
          config: newConfig
        });
      })
 
  }

  render() {
    return (
      <div className="chart-container">
        <Highstock config={this.state.config} />
      </div>
    );
  }
}

Chart.propTypes = {
  stocks: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    stocks: state.stocks
  };
}

export default connect(mapStateToProps)(Chart);
