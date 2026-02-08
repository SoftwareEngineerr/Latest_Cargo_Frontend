const typography = {
  fontFamily: "'Plus Jakarta Sans', sans-serif;",
  h1: {
    fontWeight: 600,
    fontSize: '2.25rem',
    lineHeight: '2.75rem',
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
  },
  h2: {
    fontWeight: 600,
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: '1.75rem',
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.3125rem',
    lineHeight: '1.6rem',
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: '1.6rem',
  },
  h6: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: '1.2rem',
  },
  button: {
    textTransform: 'capitalize',
    fontWeight: 400,
  },
  body1: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.334rem',
  },
  body2: {
    fontSize: '0.75rem',
    letterSpacing: '0rem',
    fontWeight: 400,
    lineHeight: '1rem',
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  Radio: {
    container: {
      display: 'block',
      position: 'relative',
      paddingLeft: '35px',
      marginBottom: '12px',
      cursor: 'pointer',
      fontSize: '22px',
      userSelect: 'none',
      '&:hover .checkmark': {
        backgroundColor: '#ccc',
      },
    },
    input: {
      position: 'absolute',
      opacity: 0,
      cursor: 'pointer',
      '&:checked ~ .checkmark': {
        backgroundColor: '#2196F3',
      },
      '&:checked ~ .checkmark:after': {
        content: '""',
        display: 'block',
        top: '9px',
        left: '9px',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'white',
        content: '""', // Use double quotes
        position: 'absolute',
      },
      '&:after': {
        top: '9px',
        left: '9px',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'white',
        content: '""', // Use double quotes
        position: 'absolute',
        // display: 'none',
      },
    },
    checkmark: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '25px',
      width: '25px',
      backgroundColor: '#eee',
      borderRadius: '50%',
      '&:after': {
        content: '""', // Use double quotes
        position: 'absolute',
        
      },
    },
  }
  
  
  
};

export default typography;
