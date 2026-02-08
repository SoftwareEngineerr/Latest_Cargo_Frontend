import { Link } from 'react-router-dom';
// import LogoDark from '/images/logos/Logo.png';
import { styled } from '@mui/material';
import { useSelector } from 'react-redux';


const PrintLogo = (props) => {
  const url = useSelector((state)=>state.Api.imageServer)
  const WebSrn = localStorage.getItem('WebSrn')

  const LinkStyled = styled(Link)(() => ({
    height: '150px',
    width: props.width ? props.width : '110px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center'
  }));
  return (
    // <LinkStyled>
    <img 
    style={{ height: window.innerWidth >1024? false: true ? '78%' : '95%', width: '95%'}} 
    src={`/images/logos/Logo2.png`}
    alt="Logo" 
    // height={window.innerWidth >1024? false: true ? 150 : 120} 
/>
   // </LinkStyled>
  )
};

export default PrintLogo;
