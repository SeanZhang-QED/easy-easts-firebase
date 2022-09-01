import styled from '@emotion/styled';
import { Card, CardHeader, CardMedia, Dialog, Chip, Stack, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db, timestamp } from "../../firebase"
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";



function Pin({ data, likedPins, fetchLikes }) {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();

  const isLiked = likedPins.find((likedPin) => likedPin.pin.id === data.id)
  const likeIcon = isLiked ? 'brand_red' : 'default';

  function handleZoomIn() {
    setOpen(true)
  }

  function handleZoomOut() {
    setOpen(false)
  }

  async function handleLikes(event) {
    event.preventDefault();

    if (isLiked) {
      try {
        await deleteDoc(doc(db, "likes", isLiked.id));
      } catch (e) {
        console.error("Error deleteing document: ", e);
      }
    } else {
      try {
        await addDoc(collection(db, "likes"), {
          userId: currentUser.email,
          pin: data,
          likedAt: timestamp()
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    fetchLikes();
  }

  const { tags } = data;

  return (
    <Wrapper>
      <Container>
        <Card
          sx={{
            bgcolor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <CardMedia
            component="img"
            src={data.url}
            onClick={handleZoomIn}
          />
          <CardHeader
            title={data.posterName}
            titleTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
            action={
              <IconButton onClick={handleLikes} color={likeIcon}>
                <FavoriteIcon />
              </IconButton>
            }
            sx={{
              '&:hover': {
                cursor: 'default'
              }
            }}
          />
        </Card>
      </Container>
      <Dialog
        open={open}
        onClose={handleZoomOut}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "650px",
          },
        }}
      >
        <Stack spacing={1}>
          <img
            src={data.url}
            alt='an enlarged pic'
            style={{
              display: 'block',
              maxWidth: 'calc(100% - 6px)',
              margin: 'auto',
              boxShadow: '3px, 5px, 7px, rgba(0,0,0,0.5)',
              border: '3px solid white'
            }}
          />
          <Typography sx={{ flex: '1' }} m='12px !important' variant='h6'>
            {data.content}
          </Typography>
          <Stack spacing={1} direction='row' m='12px !important' mt='3px !important'>
            {
              tags && tags.map((tag, index) => {
                return (
                  <Chip label={tag} key={index} />
                )
              })
            }
          </Stack>
        </Stack>
      </Dialog>
    </Wrapper>
  )
}

export default Pin;

const Wrapper = styled.div`
  display: inline-flex;
  padding: 8px;

`
const Container = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  // width: 236px;

  .MuiCardMedia-img {
    display: flex;
    cursor: zoom-in;
    border-radius: 16px;
    width: 100%;
    object-fit: cover;
  }
`
