import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router';

const COUNTDOWN_DURATION_MS = 2 * 60 * 60 * 1000; // 3 hours in milliseconds
// const COUNTDOWN_DURATION_MS = 1 * 60 * 1000; // 3 hours in milliseconds
const STORAGE_KEY = 'login_timer_start';

const CountdownTimer = () => {
  const [remainingTime, setRemainingTime] = useState(COUNTDOWN_DURATION_MS);
  const [timerExpired, setTimerExpired] = useState(false);

  // Format milliseconds to hh:mm:ss
  const formatTime = (ms) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    // Set initial timer if not set
    let startTime = localStorage.getItem(STORAGE_KEY);
    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem(STORAGE_KEY, startTime);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - parseInt(startTime);
      const timeLeft = COUNTDOWN_DURATION_MS - elapsed;

      if (timeLeft <= 0) {
        setRemainingTime(0);
        setTimerExpired(true);
        clearInterval(interval);
      } else {
        setRemainingTime(timeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = () => {
    // Optional: Reset timer or log out user
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload(); // or logout logic
  };
  const navigate = useNavigate();
  const logOut = () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("login_timer_start"); 
        localStorage.setItem("LoggedIn", 'False');
        navigate("/"); // Navigates to login page
    }
  return (
    // <div style={{ fontSize: '16px', position:'absolute', top:'-19px', right:'-19px', color: 'red' }}>
    <div style={{ fontSize: '14px', marginLeft:'24px',  color: 'red' }}>
      {formatTime(remainingTime)} پاته وخت

      <Dialog open={timerExpired} style={{direction:'rtl'}}>
        <DialogTitle>وخت پای ته ورسیدی</DialogTitle>
        <DialogContent>
          دسیشن وخت پای ته ورسیدی، مهرباني وکړئ یو واری بیا لوګین سی
        </DialogContent>
        <DialogActions>
          <Button onClick={logOut} variant="contained" color="primary">
            تایید
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CountdownTimer;
