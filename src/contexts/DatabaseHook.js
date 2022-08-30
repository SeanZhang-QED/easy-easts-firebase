import { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, onSnapshot } from "firebase/firestore";

const useDatabase = (collectionName) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, collectionName), (snap) => {
                // listening to real-time data updates
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id})
                });
                // sort all pins by create time, in descending order
                documents.sort(function(a, b) { return b.createdAt.seconds - a.createdAt.seconds})
                setDocs(documents);
            });
        return () => unsub();

    }, [collectionName])

    return { docs };
}

export default useDatabase;