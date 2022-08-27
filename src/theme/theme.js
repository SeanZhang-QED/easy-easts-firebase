import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    brand_red: {
      main: '#e60023',
    },
    brand_yellow: {
      main: '#fbfb94',
    },
    brand_pink: {
      main: '#ffe2eb',
    },
    brand_blue: {
      main: '#dafff6',
    },
    brand_darkblue: {
      main: '#006b6c'
    },
    btn_red: {
      main: '#c32f00'
    },
    btn_black: {
      main: 'rgb(17, 17, 17)'
    }
  },
  breakpoints: {
    custom: {
      xs: 400,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
});

export default theme;