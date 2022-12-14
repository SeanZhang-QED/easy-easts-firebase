import{ useState, useEffect } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(()=>{
        // references 
        const storageRef = ref(storage, file.name);
        
        uploadBytesResumable(storageRef, file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
          }, (err) => {
            setError(err);
          }, async () => {
            const url = await getDownloadURL(storageRef);
            setUrl(url);
          });
        }, [file]);

    return { progress, url, error }
}

export default useStorage;