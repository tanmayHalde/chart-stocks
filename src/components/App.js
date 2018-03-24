import React from 'react';
import './App.scss';

//TODO: component naming fix
import StockListContainer from './sidebar/StockListContainer';
import Chart from './chart/Chart';

function App() {
  return ( 
    <div className="chart-wrapper">
       {/* <Chart /> */}
       <StockListContainer />
    </div>  
  );
}

export default App;
