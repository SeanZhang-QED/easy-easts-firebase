import React, { useEffect, useRef, useState } from 'react'
import { IconButton, Button, Popover } from '@mui/material'
import styled from '@emotion/styled';
import PinterestIcon from '@mui/icons-material/Pinterest';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SmsIcon from '@mui/icons-material/Sms';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

export default function Header(props) {
    const { handleSearch } = props;
    
    const [input, setInput] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    
    const navigate = useNavigate();
    const inputRef = useRef();
    const { logout } = useAuth();
    
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const onSearch = (e) => {
        e.preventDefault()
        handleSearch(input)
    }

    const matchesBtnSet = useMediaQuery('(min-width:600px)');
    const [displayBtnSet, setDisplayBtnSet] = useState('block');

    useEffect(() => {
        if (matchesBtnSet && displayBtnSet === 'none') {
            setDisplayBtnSet('block')
        } else if (!matchesBtnSet && displayBtnSet === 'block') {
            setDisplayBtnSet('none')
        }
    }, [matchesBtnSet, setDisplayBtnSet, displayBtnSet])

    const matchesOnlySearch = useMediaQuery('(min-width:415px)');
    const [displayOnlySearch, setOnlySearch] = useState('flex');

    useEffect(() => {
        if (matchesOnlySearch && displayOnlySearch === 'none') {
            setOnlySearch('flex')
        } else if (!matchesOnlySearch && displayOnlySearch === 'flex') {
            setOnlySearch('none')
        }
    }, [matchesOnlySearch, setOnlySearch, displayOnlySearch])


    const handleLogout = () => {
        return logout();
    }

    return (
        <Wrapper>
            <LogoWrapper>
                <IconButton>
                    <PinterestIcon fontSize='large' />
                </IconButton>
            </LogoWrapper>
            <HomePagebtn
                style={{ display: displayOnlySearch }}
                onClick={() => {
                    if (inputRef.current.value !== "") {
                        navigate(0);
                    }
                }}
            >
                <Link to="/">Homepage</Link>
            </HomePagebtn>
            <Likesbtn
                style={{ display: displayOnlySearch }}
                onClick={() => {
                    inputRef.current.value = "";
                }}
            >
                <Link to="/user/likes">Likes</Link>
            </Likesbtn>
            <SearchWrapper>
                <SearchBar>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <form>
                        <input type="text" onChange={handleChange} ref={inputRef} />
                        <button type="submit" onClick={onSearch}></button>
                    </form>
                </SearchBar>
            </SearchWrapper>
            <BtnSetWrapper style={{ display: displayBtnSet }}>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                <IconButton>
                    <SmsIcon />
                </IconButton>
                <IconButton onClick={handleClick}>
                    <AccountCircleIcon />
                </IconButton>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Button variant="contained" color='brand_red' onClick={handleLogout}>
                        <b style={{ color: 'white' }}>Log out</b>
                    </Button>
                </Popover>
            </BtnSetWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 56px;
    padding: 12px 4px 4px 16px;
    background-color: white;
    color: black;
`
const LogoWrapper = styled.div`
    .MuiSvgIcon-root {
        color: #e60023;
        font-size: 42px;
        cursor: pointer;
    }
`

const Styledbtn = styled.div`
    display: flex;
    height: 48px;
    min-width: 123px;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    cursor: pointer;
    a {
        text-decoration: none;
        font-weight: 700;
        font-size: 16px;
    }
`

const HomePagebtn = styled(Styledbtn)`
    background-color: rgb(17, 17, 17);
    a {
        color: white;
    }
`

const Likesbtn = styled(Styledbtn)`
    background-color: white;
    a {
        color: black;
    }
    :hover {
        background-color: lightgray;
    }
`

const SearchWrapper = styled.div`
    flex: 1; // it will take all the space as it can 
`

const SearchBar = styled.div`
    background-color: #efefef;
    display: flex;
    height: 48px;
    width: 100%;
    border-radius: 50px;
    border: none;
    padding-left: 10px;
    
    form {
        display: flex;
        flex: 1;
    }

    form > input {
        background-color: transparent;
        border: none;
        width: 100%;
        margin-left: 5px;
        font-size: 16px;
    }

    form > button {
        display: none;
    }

    input: focus, input: active, input: hover {
        outline: none;
    }
`

const BtnSetWrapper = styled.div`
    padding-left: 16px;

`
