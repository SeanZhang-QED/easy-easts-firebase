import React, { useState, useEffect } from 'react'
import Header from '../layouts/Header'
import LikesBoard from '../layouts/LikesBoard'
import { db } from '../../firebase'
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext';

function LikesPages() {

  const [likedPins, setLikedPins] = useState([]);
  const [searchedPins, setSearchedPins] = useState(null);
  const { currentUser } = useAuth();

  async function handleSearch(tag) {
    const likesRef = collection(db, "likes");
    const q = query(likesRef, where("userId", "==", currentUser.email), where("pin.tags", "array-contains", tag), orderBy("likedAt", "desc"));
    const querySnapshot = await getDocs(q);
    let likes = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      likes.push({ ...doc.data(), id: doc.id })
    });
    setSearchedPins(likes);
  }

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

  useEffect(() => {
    fetchLikes()
  }, [])

  return (
    <>
      <Header handleSearch={handleSearch} setSearchedPins={setSearchedPins} />
      <LikesBoard likedPins={likedPins} searchedPins={searchedPins}/>
    </>
  )
}

export default LikesPages;