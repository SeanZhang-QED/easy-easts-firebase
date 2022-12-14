import { useEffect, useState } from 'react';
import { Alert, Button, Typography, Box, TextField } from '@mui/material';
import TagsInput from './TagsInput';
import useStorage from '../../contexts/StorageHook';
import styled from '@emotion/styled';

const allowedType = ['image/png', 'image/jpeg'];

function PinForm({ tags, setTags, setContent }) {
    return (
        <Box sx={{mt: 3}}>
            <TagsInput tags={tags} setTags={setTags} />
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 0, mb: 1 },
                    overflow: 'hidden',
                    mt: 1
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    fullWidth
                    label="Ideas"
                    variant="standard"
                    multiline maxRows={4}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
            </Box>
        </Box>
    )
}

function ProgressBar({ file, setFile, setFileUploaded, setUrl }) {
    const { url, progress } = useStorage(file);

    useEffect(() => {
        // set File to null to hide the bar, when we get url from firebase
        if (url) {
            setFile(null);
            setUrl(url);
            setFileUploaded(true);
        }
    }, [url, setUrl, setFile, setFileUploaded])

    return (
        <ProgressBarWrapper style={{ width: progress + '%' }}>
        </ProgressBarWrapper>
    )
}

export default function UploadButton({ tags, setTags, setContent, setUrl }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);

    const handleChange = (e) => {
        let selected = e.target.files[0]; // the first image

        if (selected && allowedType.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpeg) as pin')
            setFileUploaded(false);
        }
    }

    return (
        <>
            <Button
                variant="contained"
                component="label"
                color='brand_blue'
                sx={{}}
            >
                <Typography color="brand_darkblue.main" fontWeight="bold">
                    Upload File
                </Typography>
                <input type="file" onChange={handleChange} hidden />

            </Button>
            <div style={{ overflow: 'hidden' }}>
                {error && <Alert severity="error">{error}</Alert>}
                {file && <div style={{ marginTop: '12px' }}>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} setFileUploaded={setFileUploaded} setUrl={setUrl} />}
                {fileUploaded && <PinForm tags={tags} setTags={setTags} setContent={setContent} />}
            </div>
        </>
    )
}

const ProgressBarWrapper = styled.div`
            height: 5px;
            background-color: #8EB897;
            margin-top: 20px;
            `