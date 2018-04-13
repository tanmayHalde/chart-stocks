import React, { Component } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Chart from './chart/Chart';
import SearchBox from './search/SearchBox';
import StockList from './stocklist/StockList';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <div className="container-fluid">
        <section className="row">
          <div className="col-md-8">
            <Header />
            <Chart />
            <SearchBox />
          </div>
          <aside className="col-md-4">
            <StockList />
          </aside>  
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
