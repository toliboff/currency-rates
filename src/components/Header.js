import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid #ccc;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  background-color: hsl(194deg 96% 42%);
  color: #fff;
  position: fixed;
  top:0;
  width:100%;
  height: 5rem;
`;

const Title = styled.h1`
  
  font-size: 1.5rem;
`;

const SubTitle = styled.p`
  
  font-size: 0.8rem;
`;

const Header = ({title, subtitle}) => {
  return (
    <Container>
      <Title>
        {title}
      </Title>
      <SubTitle>{subtitle}</SubTitle>
     
    </Container>
  )
}

export default Header