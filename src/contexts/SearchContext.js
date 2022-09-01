import React, { useContext } from 'react'
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '../firebase';

const SearchContext = React.createContext()

export function useSearch() {
    return useContext(SearchContext)
}

export function SearchProvider({ children }) {

    async function searchPinsByTag(tag) {
        const pinsRef = collection(db, "pins");
        const q = query(pinsRef, where("tags", "array-contains", tag), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        let pins = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            pins.push({...doc.data(), id: doc.id})
        });
        return pins;
    }

    async function searchLikesByUserIdAndTag(userId, tag) {
        const likesRef = collection(db, "likes");
        const q = query(likesRef, where("userId", "==", userId), where("pin.tags", "array-contains", tag), orderBy("likedAt", "desc"));
        const querySnapshot = await getDocs(q);
        let likes = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            likes.push({...doc.data(), id: doc.id})
        });
        return likes;
    }

    const value = {
        searchPinsByTag,
        searchLikesByUserIdAndTag
    }

    return (
        <SearchProvider.Provider value={value}>
            {children}
        </SearchProvider.Provider>
    )
}
