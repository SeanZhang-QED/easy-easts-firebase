import React, { useState } from 'react';
import Header from '../layouts/Header';
import MainBoard from '../layouts/MainBoard';
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Alert, DialogContentText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadButton from '../widgets/UploadButton';
import { useAuth } from '../../contexts/AuthContext';
// import { useSearch } from '../../contexts/SearchContext';
import { db, timestamp } from "../../firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import useDatabase from '../../contexts/DatabaseHook';

function AlertDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
        <DialogContentText fontSize='24px'>
          Please select an image <b>FIRST</b>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}


export default function MainPage() {
  const { currentUser } = useAuth();

  const pins = useDatabase('pinsLiked').docs;
  const [searchedPins, setSearchedPins] = useState(null);

  const [open, setOpen] = useState(false);

  const [url, setUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState(null);

  const [error, setError] = useState('');
  const [noFile, setNoFile] = useState(false);
  const [loading, setLoading] = useState(false);

  // const { searchPinsByTag } = useSearch();

  async function handleSearch(tag) {
    const pinsRef = collection(db, "pinsLiked");
    let q;
    if (tag === "") {
      q = query(pinsRef, orderBy("createdAt", "desc"));
    } else {
      q = query(pinsRef, where("tags", "array-contains", tag), orderBy("createdAt", "desc"));
    }
    const querySnapshot = await getDocs(q);
    let newPins = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      newPins.push({ ...doc.data(), id: doc.id })
    });
    setSearchedPins(newPins);
  }

  async function handlePinUpload() {
    const pinRef = collection(db, "pinsLiked");
    const name = currentUser.displayName === null
      ?
      currentUser.email.match(/(\S*)@/)[1]
      :
      currentUser.displayName;

    if (url === '') {
      setNoFile(true);
      return
    }

    try {
      setLoading(true)
      setError('')
      setNoFile(false)
      await addDoc(pinRef, {
        url: url,
        posterName: name,
        posterAvatar: currentUser.photoURL,
        content: content,
        tags: tags,
        createdAt: timestamp(),
        likes:[]
      })
      setOpen(false)
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Header handleSearch={handleSearch} setSearchedPins={setSearchedPins} />
      <MainBoard pins={pins} searchedPins={searchedPins} />
      <Fab
        color="btn_red"
        sx={{
          position: 'fixed',
          bottom: 48,
          right: 48
        }}
        onClick={() => { setOpen(true) }}
      >
        <AddIcon
          color='btn_white'
          fontSize='large'
          sx={{
            '&:hover': {
              color: 'rgb(17,17,17)'
            }
          }}
        />
      </Fab>
      <AlertDialog open={noFile} handleClose={() => { setNoFile(false) }} />
      <Dialog open={open} onClose={() => { setOpen(false) }} fullWidth>
        <DialogTitle>
          <Typography noWrap fontSize="24px">
            Share Ur Ideas with the Whole World !
          </Typography>
        </DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <UploadButton tags={tags} setTags={setTags} setContent={setContent} setUrl={setUrl} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePinUpload} disabled={loading}>Submit</Button>
          <Button onClick={() => { setOpen(false) }} disabled={loading}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}