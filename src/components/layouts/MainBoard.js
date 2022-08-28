import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import Pin from './Pin'
import '../../style/MainBoard.css'

export default function MainBoard(props) {
    const { pins } = props;

    return (
        <>
            <Wrapper>
                <Container className='mainboard__container'>
                    {pins.map((item, index) => {
                        return <Pin key={index} url={item.img} />
                    })}
                </Container>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    min-width: 560px;
    margin-top: 16px;
    display: flex;
    justify-content: center;
    background-color: white;
`
const Container = styled.div`
    column-gap: 5px;
    margin: 0 auto;
    background-color: white;
`