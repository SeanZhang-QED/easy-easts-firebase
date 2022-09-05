import { Box, TextField, Chip } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useRef, useEffect } from 'react';

function TagItem({ tagValue, handleTagDelete }) {
    
    function handleDelete() {
        handleTagDelete(tagValue)
    }
    
    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                margin: "0 6px 0 0",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <Chip label={tagValue} onDelete={handleDelete} />
        </Box>
    )
}

export default function TagsInput({ tags, setTags }) {
//   const [tags, setTags] = useState([]);

  const tagRef = useRef();


  useEffect(()=>{
    setTags([])
  }, [setTags])

  //HandleSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    // validation:
    // 1. Can not be empty
    if(tagRef.current.value === "") {
      return
    }
    // 2. Can not be duplicate
    if(tags.find((tag) => tag === tagRef.current.value)) {
      tagRef.current.value = "";
      return
    }

    setTags([...tags, tagRef.current.value]);
    tagRef.current.value = "";
  };

  const handleTagDelete = (tagValue) => {
    const newTags = tags.filter((itemValue) => itemValue !== tagValue)
    setTags(newTags)
  }

  const handlePressBack = (event) => {
    if(event.key === 'Backspace' && tagRef.current.value === "") {
      const newTags = tags.slice(0, -1)
      setTags(newTags)
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleOnSubmit}>
        <TextField
          inputRef={tagRef}
          fullWidth
          sx={{ "& .MuiInputBase-root": {
              height: '40px'
            }
          }} 
          variant="standard"
          label='tags'
          id='tags'
          name='tags'
          placeholder={tags.length < 5 ? "Enter tags here" : ""}
          InputProps={{
            startAdornment: (
              <Stack direction='row' alignItems='center'>
                {
                  tags.map((item, index) => {
                    return (
                      <TagItem key={index} tagValue={item} handleTagDelete={handleTagDelete}/>
                    )
                  })
                }
              </Stack>
            )
          }}
          onKeyDown={handlePressBack}
        />
      </form>
    </Box>
  )
}
