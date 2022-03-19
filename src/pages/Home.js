import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCurrentRatings } from '../api';
import Currency from '../components/Currency';
import Header from '../components/Header';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 6rem auto 0;
  width: 50%;
`;

const Title = styled.span`
  font-weight:400;
`;

const ListTitle = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #999;
`;
const ListItem = styled.li`
  border: 1px solid transparent;
  border-bottom: 1px solid #ccc;
  &:hover{
    border: 1px solid #999;
    box-shadow: 0 0 2px 2px #ccc;
    border-radius: 3px;
  }
  padding: 0.5rem;

`;
const Home = () => {
  const [currencies, setCurrencies] = useState(null);

  useEffect(()=>{
    const getRatings = async () => {
         try {
          const currencyList =  await getCurrentRatings();
          setCurrencies({date: new Intl.DateTimeFormat('RU').format(currencyList.date), rates: Object.values(currencyList.Valute)});
        }
         catch (error) {
        }
      }
      getRatings();    
  },[]);

  const showToolTip = (event, name) => {
    console.log('Name: ',event.pageX, event.pageY,  name)
  }
  
  return (<>
  
      <Header title='Курсы валют Центрального Банка РФ' subtitle={`на ${currencies?.date} г. `}/>
       <List>
         <ListTitle> 
           <Title>Валюта</Title>
           <Title>Курс</Title>
           <Title>Тренд</Title>
         </ListTitle>
         
      {
        currencies && currencies.rates.map((currency) => <ListItem key={currency.ID } showToolTip={showToolTip}>
            <Currency  
              currency={currency} 
              date={currencies.Date} 
              previousDate = {currencies.PreviousDate} 
              previousURL = {currencies.PreviousURL}
                
            />
          </ListItem>)
      }
     
      </List>
</>
  );
}

export default Home