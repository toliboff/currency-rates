import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CurrencyLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
`

const CurrencyCode = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  height: 1.5rem;
  box-shadow: 0 0 3px 3px #ccc;
  margin-right: 1rem;
`;

const Trend = styled.div`
  font-weight: 700;
  color: ${params => params.trend > 0 
    ? 'green'
    : params.trend < 0 ? 'red' : 'grey'};
`

const Currency = ({currency, showToolTip}) => {
  function checkTrend(current, previous) {
    if (current > previous) {
      return -((current-previous) / current * 100).toFixed(2);
    }
    else if (current < previous) {
      return ((previous-current) / previous * 100).toFixed(2);
    }
    else return 0;
  };

  return (<CurrencyLink 
            to={`currency/${currency.CharCode}` } 
            tooltip={currency.Name} 
            onMouseEnter={(event)=>showToolTip(event, currency.Name, true)}
            onMouseLeave={(event)=>showToolTip(event, currency.Name, false)}>
            <CurrencyCode>
              <Image src={currency.CharCode === 'XDR'
                ? 'https://valuta.exchange/img/flags/xdr-flag.png'
                : `https://github.com/transferwise/currency-flags/blob/master/src/flags/${currency.CharCode.toLowerCase()}.png?raw=true`} />
              {currency.CharCode}
            </CurrencyCode>
                        
            <div>{currency.Value.toFixed(4)}</div> 
            <Trend trend={checkTrend(currency.Value, currency.Previous)}>
              {checkTrend(currency.Value, currency.Previous )}%
              {checkTrend(currency.Value, currency.Previous ) > 0 ? '▲': '▼' }
            </Trend>
          </CurrencyLink>
  )
}

export default Currency