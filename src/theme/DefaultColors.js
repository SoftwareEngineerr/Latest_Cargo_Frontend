import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import { shadows } from "./Shadows";
import { Main } from './main';
import { customizeSideBar } from './customizeSideBar';
import { Components } from './components';
import { useSelector } from "react-redux";

export const Themefunc = () => {
  const themedata = useSelector((state) => state.theme);

  return createTheme({
    direction: 'ltr',
    palette: {
      addbutn: {
        data: {
          background: 'lightblue',
          color: 'blue',
          borderRadius: '50%',
          height: "58px",
          position: "fixed",
          right: "63px",
          bottom: "25px",
        },
      },
      primary: {
        main: themedata.menucolor == '#f1f1f1' ? '#f1f1f1' : themedata.menucolor,
        light: '#ffa8001f',
        dark: '#7a7a7a',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ffaf00',
        light: '#E8F7FF',
        dark: '#23afdb',
      },
      success: {
        main: '#13DEB9',
        light: '#E6FFFA',
        dark: '#02b3a9',
        contrastText: '#ffffff',
      },
      info: {
        main: '#539BFF',
        light: '#EBF3FE',
        dark: '#1682d4',
        contrastText: '#ffffff',
      },
      error: {
        main: '#ff0000',
        light: '#FDEDE8',
        dark: '#f3704d',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#fffc00',
        light: '#FEF5E5',
        dark: '#ae8e59',
        contrastText: '#ffffff',
      },
      purple: {
        A50: '#EBF3FE',
        A100: '#6610f2',
        A200: '#557fb9',
      },
      grey: {
        100: '#F2F6FA',
        200: '#EAEFF4',
        300: '#DFE5EF',
        400: '#7C8FAC',
        500: '#5A6A85',
        600: '#2A3547',
      },
      text: {
        primary: '#2A3547',
        secondary: '#5A6A85',
      },
      sidemenutext: {
        primary: themedata.data == 'white' ? '#2A3547' : '#fff',
        secondary: themedata.data == 'white' ? '#5A6A85' : '#ffffff91',
        background: themedata.data == 'white' ? '#fff' : '#000',
        color: themedata.data == 'white' ? '#000' : '#fff',
        display: {
          display: themedata.display == 'none' ? 'none !important' : 'block',
        },
        width: themedata.display == 'none' ? '70px' : '280px',
      },
      action: {
        disabledBackground: 'rgba(73,82,88,0.12)',
        hoverOpacity: 0.02,
        hover: '#d8ebff',
      },
      divider: '#e5eaef',
      Main: Main(),
      Components,
      customizeSideBar,
    },

    // ✅ Typography with Poppins
    typography: {
      ...typography,
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontFamily: '"Poppins", sans-serif' },
      h2: { fontFamily: '"Poppins", sans-serif' },
      h3: { fontFamily: '"Poppins", sans-serif' },
      h4: { fontFamily: '"Poppins", sans-serif' },
      h5: { fontFamily: '"Poppins", sans-serif' },
      h6: { fontFamily: '"Poppins", sans-serif' },
      body1: { fontFamily: '"Poppins", sans-serif' },
      body2: { fontFamily: '"Poppins", sans-serif' },
      button: { fontFamily: '"Poppins", sans-serif' },
    },

    shadows,
  });
};
