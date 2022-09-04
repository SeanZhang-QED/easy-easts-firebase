import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import Pin from './Pin'
import '../../style/MainBoard.css'
import { } from '@mui/material';
import { db } from '../../firebase'
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext';

export default function MainBoard(props) {
    const { pins, searchedPins } = props;
    const [renderPins, setRenderPins] = useState([]);
    const [likedPins, setLikedPins] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!searchedPins || searchedPins.length === 0) {
            setRenderPins(pins)
        } else {
            setRenderPins(searchedPins)
        }
    }, [searchedPins, pins])

    useEffect(() => {
        const likesRef = collection(db, "likes");
        const q = query(likesRef, where("userId", "==", currentUser.email), orderBy("likedAt", "desc"));
        getDocs(q).then((querySnapshot) => {
            let documents = [];
            querySnapshot.forEach(doc => {
                documents.push({ ...doc.data(), id: doc.id })
            });
            setLikedPins(documents);
        }).catch((err) => {
            console.log('Fail to fetch likes from firestore.', err.message)
        });
    }, [currentUser])

    const fetchLikes = () => {
        const likesRef = collection(db, "likes");
        const q = query(likesRef, where("userId", "==", currentUser.email), orderBy("likedAt", "desc"));
        getDocs(q).then((querySnapshot) => {
            let documents = [];
            querySnapshot.forEach(doc => {
                documents.push({ ...doc.data(), id: doc.id })
            });
            setLikedPins(documents);
        }).catch((err) => {
            console.log('Fail to fetch likes from firestore.', err.message)
        });
    }

    return (
        <>
            <Wrapper>
                <Container className='mainboard__container'>
                    {renderPins && renderPins.map((item) => {
                        return <Pin key={item.id} data={item} likedPins={likedPins} fetchLikes={fetchLikes} />
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