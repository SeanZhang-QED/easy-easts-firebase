import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import Pin from './Pin'
import '../../style/MainBoard.css'
import { } from '@mui/material';
import { db } from '../../firebase'
import { collection, getDocs } from "firebase/firestore";

export default function MainBoard(props) {
    const { pins, searchedPins } = props;
    const [renderPins, setRenderPins] = useState([]);
    const [likedPins, setLikedPins] = useState([]);

    useEffect(() => {
        if (!searchedPins || searchedPins.length === 0) {
            setRenderPins(pins)
        } else {
            setRenderPins(searchedPins)
        }
    }, [searchedPins, pins])

    useEffect(() => {
        fetchLikes()
    }, [likedPins])

    function fetchLikes() {
        getDocs(collection(db, "likes")).then((querySnapshot) => {
            let documents = [];
            querySnapshot.forEach(doc => {
                documents.push({ ...doc.data(), id: doc.id })
            });
            setLikedPins(documents);
        }).catch((err)=>{
            console.log('Fail to fetch likes from firestore.', err.message)
        });
    }

    return (
        <>
            <Wrapper>
                <Container className='mainboard__container'>
                    {renderPins && renderPins.map((item) => {
                        return <Pin key={item.id} data={item} likedPins={likedPins} fetchLikes={fetchLikes}/>
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