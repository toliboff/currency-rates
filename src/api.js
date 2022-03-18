import axios from 'axios';

const BASE_URL = 'https://www.cbr-xml-daily.ru/';

export const getCurrentRatings = async() => {
  try {
    const res = await axios.get(`${BASE_URL}/daily_json.js`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const getDailyRatings = async(days = 10, currencyCode ) => {
  const rates = [];
  try {
    const initialResponce = await axios.get(`${BASE_URL}/daily_json.js`);
    rates.push({
                date: initialResponce.data.Date,
                rate: initialResponce.data.Valute[currencyCode],
                previous: initialResponce.data.PreviousURL,
              });
    for (let i = 0; i < days-1; i++) {
        const res = await axios.get(rates[i].previous);
        rates.push({
                    date:res.data.Date, 
                    rate: res.data.Valute[currencyCode], 
                    previous: res.data.PreviousURL
                  });
     }
    return rates;
  } catch (error) {
    console.log(error);
  }
}

