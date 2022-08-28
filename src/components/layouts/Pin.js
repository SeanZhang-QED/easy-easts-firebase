import styled from '@emotion/styled';
import { Card, CardHeader, CardMedia, Avatar } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext'
import React, { } from 'react'


function Pin({ url }) {
  const { currentUser } = useAuth()

  return (
    <Wrapper>
      <Container>
        <Card
          sx={{ bgcolor: 'transparent', boxShadow: 'none'}}
        >
          <CardMedia
            component="img"
            src={url}
          />
          {/* <CardHeader
            avatar={
              <Avatar src={currentUser.photoURL} sx={{width: 30, height: 30 }}>
                A
              </Avatar>
            }
            title='username of poster'
          /> */}
        </Card>
      </Container>
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
  width: 236px;

  .MuiCardMedia-img {
    display: flex;
    cursor: zoom-in;
    border-radius: 16px;
    width: 100%;
    object-fit: cover;
  }
`
