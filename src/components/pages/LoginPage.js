import React, { useState } from 'react'
import {
    CssBaseline, Grid, TextField, Button, Box, Typography, Divider, IconButton, InputAdornment,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link as MuiLink, Alert, Avatar
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
            <Divider variant='middle'style={{margin: 0}}>
                <Typography variant="body" align="center" color='gray'>
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
                <Avatar sx={{ m: 1, bgcolor:'transparent'}}>
                    <svg style={{display:'block'}} t="1661395678806" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2341" width="200" height="200">
                        <path d="M511.82939 0C229.256914 0 0 229.128957 0 511.82939c0 209.551483 126.037987 389.630123 306.415195 468.793069-1.450183-35.7001-0.213262-78.651116 8.871709-117.55015l65.855382-278.861713s-16.335888-32.671776-16.335888-81.039653c0-75.836055 44.017328-132.478507 98.74042-132.478507 46.49117 0 69.011663 34.975008 69.011663 76.902366 0 46.747084-29.856714 116.739753-45.211597 181.571476-12.795735 54.33922 27.212263 98.612463 80.783739 98.612462 96.991669 0 162.292569-124.545152 162.292569-272.122625 0-112.175941-75.537488-196.115961-212.963679-196.115962-155.254915 0-251.948017 115.758747-251.948017 245.038321 0 44.657114 13.094302 76.091969 33.695435 100.403865 9.511496 11.260247 10.79107 15.696101 7.336221 28.577141-2.388537 9.340886-8.061313 32.074642-10.407197 41.074309-3.412196 12.923692-13.904698 17.615462-25.59147 12.795734-71.57081-29.174275-104.83972-107.484172-104.83972-195.561479 0-145.359547 122.625791-319.765412 365.787404-319.765412 195.433522 0 324.073309 141.478174 324.073309 293.235589 0 200.807731-111.62146 350.773742-276.217261 350.773742-55.192269 0-107.228257-29.856714-125.014328-63.722759 0 0-29.77141 117.89137-35.998667 140.667777-10.833722 39.410863-32.074642 78.907031-51.524159 109.616794 46.064645 13.563479 94.688437 20.985005 145.018327 20.985005 282.700433 0 511.82939-229.128957 511.82939-511.82939S794.529823 0 511.82939 0" fill="#CC2127" p-id="2342"></path>
                    </svg>
                </Avatar>
                <Typography variant="h4" gutterBottom marked="center" align="center" color='brand_red.main'
                    sx={{ fontWeight: 'bold', mt: 2 }}>
                    Hi, Welcome Back
                </Typography>
                {error !== ''
                    ?
                    <Alert severity="error">
                        {error}
                    </Alert>
                    :
                    <Typography variant="body2" align="center" color='gray'>
                        Log in with Email address
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
                    <LoginWithGoogle />
                </Box>
                <ResetDialog isReset={isReset} handleClose={() => { setIsReset(false) }} />
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
