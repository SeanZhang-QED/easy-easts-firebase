import React, { useState, useEffect } from 'react';
import { Box, Stack, Chip, Typography, Dialog } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem, { } from "@mui/material/ImageListItem";
import theme from '../../theme/theme';

const getColNums = (width) => {
  const breakpoints = theme.breakpoints.custom;

  if (width < breakpoints.xs) {
    return 1
  } else if (width < breakpoints.sm) {
    return 2
  } else {
    return 3
  }
}


function ZoomInDialog({ open, setOpen, selectedItem }) {

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "630px",
        },
      }}
    >
      <Stack spacing={1}>
        <img
          src={selectedItem && selectedItem.url}
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
          {selectedItem && selectedItem.content}
        </Typography>
        <Stack spacing={1} direction='row' m='12px !important' mt='3px !important'>
          {
            selectedItem && selectedItem.tags.map((tag, index) => {
              return (
                <Chip label={tag} key={index} />
              )
            })
          }
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default function LikesBoard({ likedPins, searchedPins }) {

  const [colNums, setColNums] = useState(getColNums(window.innerWidth))

  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [renderPins, setRenderPins] = useState([]);

  const onWidthUpdate = () => {
    setColNums(getColNums(window.innerWidth))
  }

  useEffect(() => {
    window.addEventListener("resize", onWidthUpdate);
    return () => window.removeEventListener("resize", onWidthUpdate);
  }, []);

  useEffect(() => {
    if (!searchedPins || searchedPins.length === 0) {
      setRenderPins(likedPins)
    } else {
      setRenderPins(searchedPins)
    }
  }, [searchedPins, likedPins])

  const handleZoomIn = (item) => {
    setOpen(true)
    setSelectedItem(item)
  }

  return (
    <Box width='100%' sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box width='88%' maxWidth='1280px' mt={1}>
        <ImageList variant="masonry" cols={colNums} gap={16}>
          {
            renderPins && renderPins.map((item, index) => (
              <ImageListItem
                key={index}
                width='236px'
                onClick={() => { handleZoomIn(item) }}
              >
                <img
                  src={item.url}
                  alt={item.content}
                  loading="lazy"
                  style={{ cursor: 'zoom-in', borderRadius: '16px' }}
                />
              </ImageListItem>
            ))
          }
        </ImageList>
      </Box>
      <ZoomInDialog open={open} setOpen={setOpen} selectedItem={selectedItem} />
    </Box>
  )
}

