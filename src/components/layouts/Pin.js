import styled from '@emotion/styled';
import React from 'react'

function Pin() {
  return (
    <Wrapper>
        <Container>
          <img src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' />
        </Container>
    </Wrapper>
  )
}

export default Pin;

const Wrapper = styled.div`
  display: inline-flex;
  padding: 8px;

`

const Container = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  width: 236px;

  img {
    display: flex;
    cursor: zoom-in;
    border-radius: 16px;
    width: 100%;
    object-fit: cover;
  }
`
