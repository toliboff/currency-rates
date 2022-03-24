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
  

`;
const Tooltip = styled.div`
  border: 1px solid #ccc;
  padding: 5px;
  position: absolute;
  left:${params=>params.xPosition}px;
  top:${params=>params.yPosition-50}px;
  display: ${params=> params.show? 'block': 'none'};
  z-index: 999;
  background-color: #fff;
`;

const Home = () => {
  const [currencies, setCurrencies] = useState(null);
  const [tooltip, setTooltip] = useState({
    show: false,
    xPosition:0,
    yPosition:0,
    text:'',
  });

  useEffect(()=>{
    const getRatings = async () => {
         try {
          const currencyList =  await getCurrentRatings();
          setCurrencies({
            date: new Intl.DateTimeFormat('RU').format(currencyList.date),
            rates: Object.values(currencyList.Valute),
          });
        }
         catch (error) {
        }
      }
      getRatings();    
  },[]);

  const handleToolTip = (event, name, show) => {
    setTooltip({
      ...tooltip, 
      yPosition: event.pageY, 
      xPosition: event.clientX, 
      text: name, 
      show,
    });
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
        currencies && currencies.rates.map((currency) => <ListItem key={currency.ID } >
            <Currency  
              currency={currency} 
              date={currencies.Date} 
              previousDate = {currencies.PreviousDate} 
              previousURL = {currencies.PreviousURL}
              showToolTip={handleToolTip}
            />
          </ListItem>)
      }
      <Tooltip 
          yPosition = {tooltip.yPosition} 
          xPosition = {tooltip.xPosition} 
          show={tooltip.show}>
        {tooltip.text}
      </Tooltip>
      </List>
     
</>
  );
}

export default Home