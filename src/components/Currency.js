import React from 'react'

const Currency = ({currency}) => {
 
  return (<>
      <div>{currency.NumCode}</div>
      <div>{currency.CharCode}</div>
      <div>{currency.Nominal}</div>
      <div>{currency.Name}</div>
      <div>{currency.Value}</div>
      <div>{currency.Previous}</div>
    </>
  )
}

export default Currency