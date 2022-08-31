import styled from '@emotion/styled'
import React, {  } from 'react'
import Pin from './Pin'
import '../../style/MainBoard.css'
import {  } from '@mui/material';

export default function MainBoard(props) {
    const { pins } = props;

    return (
        <>
            <Wrapper>
                <Container className='mainboard__container'>
                    {pins && pins.map((item) => {
                        return <Pin key={item.id} data={item} />
                    })}
                </Container>
            </Wrapper>
        </>
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
    width: 80%;
    max-width: 1280px;
    column-gap: 5px;
    margin: 0 auto;
    background-color: white;
`