import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './App.scss';
import toastr from 'toastr';

//TODO: component naming fix 
import Chart from './chart/Chart';
import SearchBox from './search/SearchBox';
import StockListContainer from './sidebar/StockListContainer';
import * as actions from '../actions/stockActions';
import { isStockListEmpty } from '../utils/stockDataHandler';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props) {
    super(props);
    // let socket = io('https://th-stockchart.herokuapp.com/');
    let socket = io('http://localhost:3000');
    this.state = {
      socket: socket
    };
  }

  componentDidMount() {
    this.state.socket.on('connectionSuccess', () => {
			return toastr.warning('Socket connnected ');
		});
		this.state.socket.on('stockAdded', stock => {
			this.props.actions.addStock(stock);
		});
		this.state.socket.on('stockRemoved', (stock) => {
			this.props.actions.removeStock(stock);
		});
  }

  render() {
    return ( 
      <div className="chart-wrapper">
         <Chart />
         {!isStockListEmpty(this.props.state) && 
          <StockListContainer socket={this.state.socket} />}
         <SearchBox socket={this.state.socket}/>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    state: state.stocks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
