import styled from '@emotion/styled'
import React from 'react'
import Pin from './Pin'

export default function MainBoard() {
  return (
    <Wrapper>
        <Container>
            <Pin />
        </Container>
    </Wrapper>
  )
}


const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    margin-top: 16px;
    display: flex;
    justify-content: center;
    background-color: white;
`
const Container = styled.div`
    height: 100%;
    width: 80%;
`