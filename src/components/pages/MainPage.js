import React, { useEffect, useState } from 'react'
import Header from '../layouts/Header'
import MainBoard from '../layouts/MainBoard'
import { Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Alert, DialogContentText } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import UploadButton from '../UploadButton';
import { useAuth } from '../../contexts/AuthContext';
import { db, timestamp } from "../../firebase"
import { collection, addDoc } from "firebase/firestore";

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

  const [pins, setPins] = useState([]);
  const [open, setOpen] = useState(false);

  const [url, setUrl] = useState('');
  const [tag, setTag] = useState(null);
  const [content, setContent] = useState(null);

  const [error, setError] = useState('');
  const [noFile, setNoFile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllPins()
  }, [])

  const fetchAllPins = () => {
    setPins(testPins)
  }

  const handleSearch = (term) => {
    console.log("Search on firebase database for: ", term);
    // fetch firebase ...
    let newPins = searchPins.concat(testPins)
    setPins(newPins)
  }

  async function handlePinUpload() {
    const pinRef = collection(db, "pins");
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
        tags: tag,
        createdAt: timestamp()
      })
      setOpen(false)
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Header handleSearch={handleSearch} />
      <MainBoard pins={pins} />
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
          <UploadButton setTag={setTag} setContent={setContent} setUrl={setUrl} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePinUpload} disabled={loading}>Submit</Button>
          <Button onClick={() => { setOpen(false) }} disabled={loading}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const searchPins = [
  {
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    title: 'food',
  }
]

const testPins = [
];