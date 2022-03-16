import axios from 'axios';

const BASE_URL = 'https://www.cbr-xml-daily.ru/';

export const getCurrentRatings = async() => {
  try {
    const res = await axios.get(`${BASE_URL}/daily_json.js`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

