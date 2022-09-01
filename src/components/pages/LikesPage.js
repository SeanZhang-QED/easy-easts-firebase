import React, { useState, useEffect } from 'react'
import Header from '../layouts/Header'
import LikesBoard from '../layouts/LikesBoard'
import { db } from '../../firebase'
import { collection, getDocs } from "firebase/firestore";

function LikesPages() {

  const [likedPins, setLikedPins] = useState([]);
  
  const handleSearch = (term) => {
    console.log("Search on firebase database for: ", term);
  }

  useEffect(() => {
    fetchLikes()
  }, [])

  function fetchLikes() {
    getDocs(collection(db, "likes")).then((querySnapshot) => {
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
      <Header handleSearch={handleSearch} />
      <LikesBoard likedPins={likedPins} />
    </>
  )
}

export default LikesPages;

// const likedPins = [
//   {
//     url: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
//     content: 'Bed',
//     tags: ['Bed'],
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
//     content: 'Books',
//     tags: ['Books'],
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
//     content: 'Sink',
//     tags: ['Sink'],
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
//     content: 'Kitchen',
//     tags: ['Kitchen'],
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
//     content: 'Blinds',
//     tags: ['Blinds'],
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
//     content: 'Chairs',
//     tags: ['Chairs'],
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
//     content: 'Laptop',
//     tags: ['Laptop'],
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
//     content: 'Doors',
//     tags: ['Doors'],
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
//     content: 'Coffee',
//     tags: ['Coffee'],
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
//     content: 'Storage',
//     tags: ['Storage'],
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
//     content: 'Candle',
//     tags: ['Candle'],
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
//     content: 'Coffee table',
//     tags: ['Coffee table'],
//   },
// ];