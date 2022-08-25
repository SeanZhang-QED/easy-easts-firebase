import React, { useState } from 'react'
import {
    CssBaseline, Grid, TextField, Button, Box, Typography, Divider, IconButton, InputAdornment,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link as MuiLink, Alert
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function LoginWithGoogle() {
    const [loading, setLoading] = useState(false)
    const { loginWithGoogle } = useAuth()
    const navigate = useNavigate()

    async function handleLogin() {
        try {
            setLoading(true)
            await loginWithGoogle()
            navigate('/')
            console.log("login success")
        } catch (err) {
            console.log(err.message)
        }
        setLoading(false)
    }

    return (
        <Box sx={{ mt: 1 }} style={{ width: '100%' }}>
            <Divider variant='middle'>
                <Typography variant="body2" align="center" color='gray'>
                    Or log in with
                </Typography>
            </Divider>
            <Box style={{ width: '100%' }} display="flex" justifyContent="center" alignItems="center">
                <IconButton onClick={handleLogin} disabled={loading} size='large'>
                    <GoogleIcon color='primary' fontSize='large' />
                </IconButton>
            </Box>
        </Box>
    )
}


function ResetDialog(props) {
    const { isReset, handleClose } = props;

    function handleReset(event) {
        event.preventDefault();
        console.log(event.currentTarget)
    }

    return (
        <Dialog open={isReset} onClose={handleClose}>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To reset your password, please enter your email address here.
                    And check your inbox for futher instruction.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleReset}>submit</Button>
            </DialogActions>
        </Dialog>
    )

}


function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isPEmpty, setIsPEmpty] = useState(false);
    const [isUEmpty, setIsUEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isReset, setIsReset] = useState(false);

    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });

        try {
            setError('')
            setLoading(true)
            await login(data.get('email'), data.get('password'))
            navigate('/')
            console.log("login success")
        } catch (err) {
            if(err.message.substring(0,8) === 'Firebase') {
                setError(err.message.substring(9))
            } else {
                setError(err.message)
            }
        }
        setLoading(false)
    };

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5" gutterBottom marked="center" align="center" color='brand_red.main'
                    sx={{ fontWeight: 'bold', mt: 4 }}>
                    Hi, Welcome Back
                </Typography>
                {error !== ''
                    ?
                    <Alert severity="error">
                        {error}
                    </Alert>
                    :
                    <Typography variant="body2" align="center" color='gray'>
                        Sign in with Email address
                    </Typography>
                }
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                        autoComplete="current-password"
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
                    <Grid container style={{ marginTop: '15px' }}>
                        <Grid item xs>
                            <MuiLink onClick={() => { setIsReset(true) }} >
                                Forget password?
                            </MuiLink>
                        </Grid>
                        <Grid item>
                            <Link to="/signup">Don't have an account? Sign up</Link>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        color="brand_red"
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        <Typography color='white' fontWeight='bold'>
                            {loading ? 'In progress' : 'Log In'}
                        </Typography>
                    </Button>
                </Box>
                <ResetDialog isReset={isReset} handleClose={() => { setIsReset(false) }} />
                <LoginWithGoogle />
            </Box>
        </>
    )
}

export default function LoginPage() {

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} elevation={6}>
                <LoginForm />
            </Grid>
        </Grid>
    )
}
