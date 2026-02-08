import { useRoutes } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Loader from './components/loader/loader';
import { CssBaseline, ThemeProvider, Box, Typography } from '@mui/material';
import './assets/css/index.scss';
import Popup from './components/popup/popup'; 
import { Themefunc } from './theme/DefaultColors'; 
import { Routering } from './routes/routes';
import { FirstTimeWebSrn } from './hooks/FirstTimeWebSrn/FirstTimeWebSrn';

const LOCK_KEY = "APP_SINGLE_TAB";

function App() {
  const routing = useRoutes(Routering);
  const theme = Themefunc();
  const tabId = useRef(Date.now().toString());
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    // Try to set this tab as active
    const currentLock = localStorage.getItem(LOCK_KEY);

    if (!currentLock) {
      localStorage.setItem(LOCK_KEY, tabId.current);
      setBlocked(false);
    } else if (currentLock !== tabId.current) {
      setBlocked(true);
    }

    const handleStorageChange = (event) => {
      if (event.key === LOCK_KEY && event.newValue !== tabId.current) {
        setBlocked(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    window.addEventListener("beforeunload", () => {
      const lock = localStorage.getItem(LOCK_KEY);
      if (lock === tabId.current) {
        localStorage.removeItem(LOCK_KEY); // free lock when tab closed
      }
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // if (blocked) {
  //   // ❌ Blocked tab just stays here, does nothing
  //   return (
  //     <Box
  //       sx={{
  //         height: "100vh",
  //         width: "100%",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         backgroundColor: "#000",
  //         color: "#fff",
  //         textAlign: "center",
  //         p: 3,
  //       }}
  //     >
  //       <Typography variant="h5">
  //         🚫 This app is already open in another tab.<br />
  //         Please close this tab.
  //       </Typography>
  //     </Box>
  //   );
  // }

  // ✅ Active tab works normally
  return (
    <ThemeProvider theme={theme}> 
      <FirstTimeWebSrn />
      <Popup />
      <Loader />
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App;
