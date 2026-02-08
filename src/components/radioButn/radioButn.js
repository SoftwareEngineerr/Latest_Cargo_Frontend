import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

const RadioButn = (props) => {
  const theme = useTheme();
  const style = theme.typography.Radio;
//   //console.log(style);

  return (
    <>
    <label className="container">
      <input {...props}  />
    <span className="checkmark"></span>
  </label>
    </>
  );
};

RadioButn.propTypes = {};

export default RadioButn;
