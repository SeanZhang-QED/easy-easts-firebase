import styled from '@emotion/styled';
import { Card, CardHeader, CardMedia, Dialog, Chip, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'

function Pin({ data }) {
  const [open, setOpen] = useState(false);

  function handleZoomIn() {
    setOpen(true)
  }

  function handleZoomOut() {
    setOpen(false)
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
