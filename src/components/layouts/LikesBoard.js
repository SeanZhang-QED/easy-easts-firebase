import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem, { imageListItemClasses } from "@mui/material/ImageListItem";
import theme from '../../theme/theme'

const getColNums = (width) => {
  const breakpoints = theme.breakpoints.custom;

  if (width < breakpoints.xs) {
    return 1
  } else if (width < breakpoints.sm) {
    return 2
  } else if (width < breakpoints.md) {
    return 3
  } else if (width < breakpoints.lg) {
    return 4
  } else if (width < breakpoints.xl) {
    return 5
  } else {
    return 6
  }
}


export default function LikesBoard(props) {

  const [colNums, setColNums] = useState(getColNums(window.innerWidth))
  const [likedPins, setLikePins] = useState(props.likedPins);

  const onWidthUpdate = () => {
    setColNums(getColNums(window.innerWidth))
  }

  useEffect(() => {
    window.addEventListener("resize", onWidthUpdate);
    return () => window.removeEventListener("resize", onWidthUpdate);
  }, []);

  return (
    <Box width='100%' sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box width='88%' mt={1}>
        <ImageList variant="masonry" cols={colNums} gap={7}>
          {
            likedPins.map((item) => (
              <ImageListItem key={item.img} width='236px'>
                <img
                  src={`${item.img}?w=236&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=236&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  style={{ cursor: 'zoom-in', borderRadius: '16px' }}
                />
              </ImageListItem>
            ))
          }
        </ImageList>
      </Box>
    </Box>
  )
}

