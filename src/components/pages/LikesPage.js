import React, { useState, useEffect, useCallback } from 'react';
import Header from '../layouts/Header';
import LikesBoard from '../layouts/LikesBoard';
import { db } from '../../firebase';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useAuth } from '../../contexts/AuthContext';

function LikesPages() {

  const [likedPins, setLikedPins] = useState([]);
  const [searchedPins, setSearchedPins] = useState(null);
  const { currentUser } = useAuth();

  async function handleSearch(tag) {
    const likesRef = collection(db, "pinsLiked");
    let q;
    if (tag === "") {
      q = query(likesRef, orderBy("createdAt", "desc"));
    } else {
      q = query(likesRef, where("tags", "array-contains", tag), orderBy("createdAt", "desc"));
    }
    const querySnapshot = await getDocs(q);
    let likes = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const isLiked = doc.data().likes.find(likedUser => likedUser === currentUser.email)
      if (isLiked) {
        likes.push({ ...doc.data(), id: doc.id })
      }
    });
    setSearchedPins(likes);
  }

  const fetchLikes = useCallback(() => {
    console.log('Call fetchLikes once!')
    const likesRef = collection(db, "pinsLiked");
    const q = query(likesRef, where("likes", "array-contains", currentUser.email), orderBy("createdAt", "desc"));
    getDocs(q).then((querySnapshot) => {
      let documents = [];
      querySnapshot.forEach(doc => {
        documents.push({ ...doc.data(), id: doc.id })
      });
      // console.log('Currently liked pins are here: ', documents);
      setLikedPins(documents);
    }).catch((err) => {
      console.log('Fail to fetch likes from firestore.', err.message)
    });
  }, [currentUser])

  useEffect(() => {
    fetchLikes()
  }, [fetchLikes])

  return (
    <>
      <Header handleSearch={handleSearch} setSearchedPins={setSearchedPins} />
      <LikesBoard likedPins={likedPins} searchedPins={searchedPins} />
    </>
  )
}

export default LikesPages;