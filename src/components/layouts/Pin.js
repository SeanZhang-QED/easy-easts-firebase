import styled from '@emotion/styled';
import { Card, CardHeader, CardMedia, Dialog, Chip, Stack, Typography, IconButton, Box, Button, Icon } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db, timestamp } from "../../firebase"
import { collection, addDoc, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";



function Pin({ data, likedPins, fetchLikes }) {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();

  const isLiked = likedPins.find((likedPin) => likedPin.id === data.id)
  const likeIcon = isLiked ? 'brand_red' : 'default';

  function handleZoomIn() {
    setOpen(true)
  }

  function handleZoomOut() {
    setOpen(false)
  }

  async function handleLikes(event) {
    event.preventDefault();

    let newLikes = [];
    if (isLiked) {
      newLikes = data.likes.filter(likes => likes !== currentUser.email);
    } else {
      newLikes = [
        ...data.likes,
        currentUser.email,
      ]
    }
    try {
      await updateDoc(doc(db, 'pinsLiked', data.id), { likes: newLikes })
    } catch (error) {
      console.error("Error deleteing/adding likes: ", error);
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ flex: '1' }} m='12px !important' variant='h6'>
              {data.content}
            </Typography>
            <IconButton variant="outlined" onClick={handleLikes} color={likeIcon}>
              <FavoriteBorderOutlinedIcon />
              {data.likes.length}
            </IconButton>
          </Box>
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
