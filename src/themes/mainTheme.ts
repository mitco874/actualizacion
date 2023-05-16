import { createTheme } from "@mui/material";

const font =  "'PT Sans', sans-serif";

export const mainTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
        main: '#0c3169',
      },
      secondary: {
        main: '#616161',
      },
      background: {
        default: '#eeeeee',
      },
  },
  typography: {
    fontFamily: font,
  },

});