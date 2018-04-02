import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import Header from './header/Header';
import Footer from './footer/Footer';
import Chart from './chart/Chart';
import SearchBox from './search/SearchBox';
import StockList from './stocklist/StockList';
import * as actions from '../actions/stockActions';

import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './App.scss';
import toastr from 'toastr';

class App extends Component {
  constructor(props) {
    super(props);

    // throws error if port is mentioned for production build on heroku
    this.socket = io(`https://th-chartstock.herokuapp.com`);
  }

  componentDidMount() {
    this.socket.on('connectionSuccess', data => {
			toastr.warning('Connnected to server');
		});
		this.socket.on('stockAdded', stock => {
			this.props.actions.addStock(stock);
		});
		this.socket.on('stockRemoved', (stock) => {
			this.props.actions.removeStock(stock);
		});
  }

  render() {
    return ( 
      <div className="container-fluid">
        <div className="row">
          <section>
            <div className="col-md-8">
              <Header />
              <Chart />
              <SearchBox socket={this.socket}/>
            </div>
            <aside>
              <div className="col-md-4">
                <StockList socket={this.socket} />
              </div>
            </aside>  
          </section>
        </div> 
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(App);
