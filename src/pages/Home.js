import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCurrentRatings } from '../api';
import Currency from '../components/Currency';
import Header from '../components/Header';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 5rem;
`;
const ListItem = styled.li`
  border-bottom: 1px solid #ccc;
`;
const Home = () => {
  const [currencies, setCurrencies] = useState(null);

  useEffect(()=>{
    const getRatings = async () => {
         try {
          const currencyList =  await getCurrentRatings();
          setCurrencies({date: currencyList.date, rates: Object.values(currencyList.Valute)});
          const l = currencyList;
          console.log('List: ', currencyList);
        }
         catch (error) {
        }
      }
      getRatings();    
  },[]);


  return (<>
  
      <Header />
       <List>
      {
        currencies && currencies.rates.map((currency) => <ListItem key={currency.ID}><Currency  currency={currency} date={currencies.Date} previousDate = {currencies.PreviousDate} previousURL = {currencies.PreviousURL}/></ListItem>)
      }
     
      </List>
</>
  );
}

export default Home