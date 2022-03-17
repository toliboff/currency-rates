import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CurrencyLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`

const Trend = styled.div`
  font-weight: 700;
  color: ${params => params.trend > 0 
    ? 'green'
    : params.trend < 0 ? 'red' : 'grey'};
`
function checkTrend(current, previous) {
  if (current > previous) {
    return -((current-previous)/current*100).toFixed(2);
  }
  else if (current < previous) {
    return ((previous-current)/previous*100).toFixed(2);
  }
  else return 0;
}

const Currency = ({currency}) => {
  return (<CurrencyLink to={`currency/${currency.CharCode}`}>
            <div>{currency.CharCode}</div>
            <div>{currency.Value.toFixed(4)}</div> 
            <Trend trend={checkTrend(currency.Value, currency.Previous)}>
              {checkTrend(currency.Value, currency.Previous )}%
              {checkTrend(currency.Value, currency.Previous ) > 0 ? '▲': '▼' }
            </Trend>
          </CurrencyLink>
  )
}

export default Currency