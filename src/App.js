import { useEffect, useState } from 'react';
import { getCurrentRatings } from './api';
import './App.css';
import Currency from './components/Currency';
import Header from './components/Header';

function App() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(()=>{
    const getRatings = async () => {
         try {
          const currencyList =  await getCurrentRatings();
          setCurrencies(Object.values(currencyList.Valute));
          const l = currencyList;
          console.log('List: ', Object.entries(l.Valute));
        }
         catch (error) {
        }
      }
      getRatings();    
  },[]);


  return (
    <div className="App">
      <Header />
      <ul>
      {
        currencies && currencies.map((currency) => <li><Currency  currency={currency}/></li>)
      }
     
      </ul>
    </div>
  );
}

export default App;
