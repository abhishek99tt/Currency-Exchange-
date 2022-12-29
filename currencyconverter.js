import axios from 'axios';
import fetch from 'node-fetch';
import { Headers } from "node-fetch";

var myHeaders = new Headers();
myHeaders.append("apikey", "C9IrORwOEd4AZCPCfJw3EShOy3JBgoCT");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
// exchange rate

// function exchange(fromCurrency, toCurrency){
//   fetch("https://api.apilayer.com/fixer/latest?symbols=&base=eur", requestOptions)
//   .then(response => response.json())
//   .then(result => {
//     const rate = result.rates;
    
//       const exchangeRate = rate [toCurrency] / rate[fromCurrency] ;
//       console.log(exchangeRate); 
//       // console.log(rate)
//   })
//   .catch(error => console.log('error', error));
// }


 // fetch('https://restcountries.com/v3.1/all')
  // .then(response => response.json())
  // .then(result => {
  //   console.log(result[0]);
  //   // result.map(country => {
  //   //   // console.log(country.name.official);
  //   // })
  // })

const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await fetch("https://api.apilayer.com/fixer/latest?symbols=&base=eur", requestOptions);
  const result= await response.json();
  const rate = result.rates;
  const exchangeRate = rate [toCurrency] / rate[fromCurrency] ;
  if(isNaN(exchangeRate)) {
    throw new Error (`Unable to get currency ${fromCurrency} and ${toCurrency}`)
  }
  return exchangeRate; 
}

const getCountries = async (toCurrency) => {
  try{
    const response = await fetch(`https://restcountries.com/v3.1/currency/${toCurrency}`);
    const result = await response.json();
    return result.map(country => country.name.common )
  }catch(error) {
    throw new Error (`Unable to get countries which use ${toCurrency}`)
  }

}

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  const countries = await getCountries(toCurrency);
  const convertedAmount = (exchangeRate * amount).toFixed(2);
  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in following countries : ${countries}`

}

convertCurrency('USD', 'INnR', 30)
.then(message => {
  console.log(message);
})
.catch(error => {
  console.log(error);
})

