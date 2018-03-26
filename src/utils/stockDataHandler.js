import _ from 'lodash';

export function getRequiredStockProps(stocks) {
  if (!stocks) {
    return null;
  }
  return new Promise((resolve, reject) => {
    resolve(stocks.map(stock => {
      const stockData = convertStockDataToHighstockFormat(stock.dataset.data)
      return {
        name: stock.dataset.dataset_code,
        data: stockData
      };
    })); 
  });
}

/**
 * Converts stock data from api response to HighChart library format for rendering
 * @param stockData Array containing stock data for a period of time
 * @return array of stockdata in Highstock data format
 */
function convertStockDataToHighstockFormat(stockData) {
  return stockData.map(stock => {
    const date = getDateFromStock(stock);
    const closingPrice = getClosingPriceFromStock(stock);

    return [date, closingPrice];
  });

}

/**
 * Gives Date in Unix time from Quandl api reponse data.
 * @param stockData array containing daily stock data
 * @return Unix Date
 */
function getDateFromStock(stockData) {
  // NOTE: Date index is specific to quandl's api response
  const DATE_INDEX = 0;
  return Date.parse(stockData[DATE_INDEX]);
}

/**
 * Gives closing price from Quandl api reponse data.
 * @param stockData object containing daily stock data
 * @return closing price
 */
function getClosingPriceFromStock(stockData) {
  // NOTE: Stock closing index is specific to quandl's api response
  const STOCK_CLOSING_PRICE_INDEX = 4;
  return stockData[STOCK_CLOSING_PRICE_INDEX];
}

/**
 * Determine if stock data already rendered.
 * @param stocks List of stocks already rendered
 * @return 'true' if stock already rendered on chart, 'false' otherwise  
 */
export function stockExists(stocks, newStockCode) {
  return _.some(stocks, ['code', newStockCode.toUpperCase()]);
}

// other funcions to get data for the tooltip