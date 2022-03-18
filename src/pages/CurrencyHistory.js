import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import styled from 'styled-components';
import { getDailyRatings } from '../api';

const Container = styled.div`

`;

const Table = styled.table`
  width: 80%;
  margin: 6rem auto;
  cell-padding:0;
  border-spacing:0;
  border: none;

`;

const TableHead = styled.thead`

`;

const TableBody = styled.tbody`
width: 80%;
`;

const TableRow = styled.tr`
  flex:1;
  border-bottom: 1px solid black;
`;

const ColumnTitle = styled.th`
  font-weight: 400;
  color: #999;
  padding: 0.5rem;
  border-bottom: 1px solid #aaa;
`;

const TableCell = styled.td`
  padding: 0.5rem 0; 
  text-align: center;
  border-bottom: 1px solid #ccc;
`;
const Difference = styled.span`
  color: ${params=>params.trend && params.trend === 'up' ? 'green' : 'red'};
`;


const CurrencyHistory = () => {
  const params = useParams();
  const currencyName = params.charCode
  
  const [currency, setCurrency]=useState([]);

  useEffect(()=>{
    const fetchData = async ()=> {
       const list = await getDailyRatings(10, currencyName)
       console.log(list);
       setCurrency(list)
      
    }
    console.log(currency);
  fetchData();
  },[])

  return ( 
    <Container>
      <Header title='Динамика курса за 10 дней' subtitle = { `${currency[0]?.rate.Nominal} ${currency[0]?.rate.CharCode} (${currency[0]?.rate.Name}) `}/>
      ДИНАМИКА КУРСА
      <Table>
        <TableHead>
        <TableRow>
          <ColumnTitle>Дата</ColumnTitle>
          <ColumnTitle>Курс</ColumnTitle>
          <ColumnTitle>Динамика в руб.</ColumnTitle>
          <ColumnTitle>Динамика в %</ColumnTitle>
        </TableRow>
        </TableHead>
        <TableBody>
         {currency.length && currency.map((cur)=> <TableRow key={Math.random()}>
           <TableCell>
              {new Intl.DateTimeFormat('RU').format(new Date(cur.date))}
           </TableCell>
           <TableCell>
              {cur.rate.Value}
           </TableCell>
           <TableCell >
             <Difference trend = {cur.rate.Value - cur.rate.Previous >= 0 ? 'up' : 'down'}>
              {(cur.rate.Value - cur.rate.Previous) >= 0 ? '+' : ''}{(cur.rate.Value - cur.rate.Previous).toFixed(4)}
              </Difference>
           </TableCell>
           <TableCell >
             <Difference trend = {cur.rate.Value - cur.rate.Previous >= 0 ? 'up' : 'down'}>
               {(cur.rate.Value - cur.rate.Previous) >= 0 ? '+' : ''}{((cur.rate.Value - cur.rate.Previous)/cur.rate.Value*100).toFixed(2)}%
             </Difference>
              
           </TableCell>
         
           </TableRow>)}
        </TableBody>
      </Table>
     
    </Container>
  )
}

export default CurrencyHistory