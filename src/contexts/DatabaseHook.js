import { useState, useEffect } from "react"
import { db, timestamp } from "../firebase"
import { collection, addDoc } from "firebase/firestore";

const useDatabase = (data) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        // references 
        const pinRef = collection(db, "pins");
        const createdAt = timestamp();
        
        addDoc(pinRef, {
            url: data.url,
            posterName: data.userName,
            posterAvatar: data.userUrl,
            content: data.content,
            tags: data.tags,
            createdAt: createdAt 
        })
        .then(()=>{
            setSuccess('Upload successfully.')
        })
        .catch((err) => {
            setError(err.message)
        })
    },
        [data]
    );

    return { success, error }
}

export default useDatabase;