import React, { useState } from 'react';
import {
  Backdrop, CircularProgress, Typography, Alert, Box, TextField,
  InputAdornment, Button, IconButton, Grid, Link as MuiLink, CssBaseline
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function SignupForm() {
  const [isUEmpty, setIsUEmpty] = useState(false);
  const [isPEmpty, setIsPEmpty] = useState(false);
  const [isPCEmpty, setIsPCEmpty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { signup } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const passwordComfirm = data.get("password-comfirmation");

    // validation
    if (password !== passwordComfirm) {
      return setError('Password do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(email, password)
      navigate("/login")
    } catch (err) {
      if (err.message.substring(0, 8) === 'Firebase') {
        setError(err.message.substring(9))
      } else {
        setError(err.message)
      }
    }
    setLoading(false)
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h4" gutterBottom marked="center" align="center" color='brand_darkblue.main' noWrap
        sx={{ fontWeight: 'bold', mt: 3 }} >
        Sign Up and Enjoy!
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: '80%', margin: 'auto' }} >
        {error !== ''
          ?
          <Alert severity="error">
            {error}
          </Alert>
          :
          <Typography variant="body2" align="center" color='gray' noWrap>
            Sign up with Email address
          </Typography>
        }
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoFocus
          error={isUEmpty}
          helperText={isUEmpty ? 'Email is required' : ''}
          onChange={(e) => {
            if (!e.target.value) {
              setIsUEmpty(true);
            } else {
              setIsUEmpty(false);
            }
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          InputProps={{ // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          error={isPEmpty}
          helperText={isPEmpty ? 'Password is required' : ''}
          onChange={(e) => {
            if (!e.target.value) {
              setIsPEmpty(true);
            } else {
              setIsPEmpty(false);
            }
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password-comfirm"
          label="Password Comfirmation"
          name="password-comfirmation"
          type="password"
          error={isPCEmpty}
          helperText={isPCEmpty ? 'It cannot be empty.' : ''}
          onChange={(e) => {
            if (!e.target.value) {
              setIsPCEmpty(true);
            } else {
              setIsPCEmpty(false);
            }
          }}
        />
        <Grid container style={{ marginTop: '15px' }}>
          <Grid item>
            <MuiLink onClick={() => { navigate("/login") }} >
              <Typography noWrap variant="body2">
                Already have an account? Sign in
              </Typography>
            </MuiLink>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          color="brand_darkblue"
          variant="contained"
          disabled={loading}
          sx={{ mt: 3, mb: 5 }}
        >
          <Typography color='white' fontWeight='bold'>
            {loading ? 'In progress' : 'Sign Up'}
          </Typography>
        </Button>
      </Box>
    </>
  )
}

export default function SignupPage() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ width: '100vw', height: '100vh', bgcolor: 'brand_blue.main', overflow: 'hidden' }}>
        <Box sx={{
          bgcolor: 'white',
          maxWidth: '500px',
          minWidth: '400px',
          margin: 'auto',
          mt: 16,
          overflow: 'hidden',
          borderRadius: 4
        }}
        >
          <SignupForm />
        </Box>
      </Box>
    </>
  )
}
