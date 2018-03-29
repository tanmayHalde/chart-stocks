import _ from 'lodash';
import moment from 'moment';
import moment_timezone from 'moment-timezone';

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
 * Removes additional text in stock name added by Quandl
 * @param name stock name
 */
export function formattedStockName(stockName) {
  return stockName.slice(0, stockName.indexOf('(') - 1);
}

/**
 * Determine if stock data already rendered.
 * @param stocks List of stocks already rendered
 * @return 'true' if stock already rendered on chart, 'false' otherwise  
 */
export function isStockPresent(stockCodes, newStockCode) {
  return _.includes(stockCodes, newStockCode.toUpperCase());
}

export function isStockListEmpty(stocks) {
  return _.isEmpty(stocks);
}

/**
 * Format day received from Quandl
 * @param date Date received in string format
 * @return date in 'LL' format
 */
export function lastUpdateDate(date) {
  return moment(date).format('LL');
}

/**
 * Format time received from Quandl
 * @param date Date received in UTC format
 * @return time in 'h:mm z' format
 */
export function lastUpdateTime(date) {
  let formattedDate = correctedDate(date);
  formattedDate = moment_timezone(formattedDate);
  
  return formattedDate.tz('America/New_York').format('h:mm a z');
}

/**
 * Since quandl does not provides real time value, price variation
 * is calculated from the closing values of last 2 days
 * @param stockData
 * @return price change rounded to 2 decimals
 */
export function currentPriceChange(stockData) {
  let lastCloseValue = currentClosingValue(stockData);
  let secondLastCloseValue = previousClosingValue(stockData);
  
  return _.floor(lastCloseValue - secondLastCloseValue, 2);
}

/**
 * Last closing value for the stock
 * @param stockData
 * @return adjusted last closing price
 */
export function currentClosingValue(stockData) {
  // index based on Quandl api
  const ADJUSTED_CLOSE_INDEX = 11;

  // NOTE: reponse received from Quandl is sorted in ascending order
  // i.e. from the earliest available date
  return stockData[stockData.length-1][ADJUSTED_CLOSE_INDEX];
}

export function previousClosingValue(stockData) {
  // index based on Quandl api
  const ADJUSTED_CLOSE_INDEX = 11;
  return stockData[stockData.length-2][ADJUSTED_CLOSE_INDEX];
}

/**
 * Daily price change for the stock
 * @return string of daily percent change
 */
export function dailyPercentChange(stockData) {
  const priceVariation = currentPriceChange(stockData);
  const secondLastCloseValue = previousClosingValue(stockData);

  let percentChange = _.divide(priceVariation, secondLastCloseValue) * 100;
  percentChange = _.floor(percentChange, 2);

  return percentChange;
}

export function getStockCodesFromProps(stocks) {
  return stocks.map(stock => {
    return stock.dataset.dataset_code;
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
 * Changes date format from 2018-03-27T21:46:11.036Z to 2018-03-27T21:46:11Z
 * @param date in ??? format
 * @return date in UTC format
 */
function correctedDate(date) {
  // Except 'Z', dont need the last 4 chars
  // TODO: Better soln ?
  let utcDate = date.slice(0, date.length-5) + 'Z';
  return utcDate;
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
 * Gives Date in Unix time from Quandl api reponse data.
 * @param stockData array containing daily stock data
 * @return Unix Date
 */
function getDateFromStock(stockData) {
  // NOTE: Date index is specific to quandl's api response
  const DATE_INDEX = 0;
  return Date.parse(stockData[DATE_INDEX]);
}