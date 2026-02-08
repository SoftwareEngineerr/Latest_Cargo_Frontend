import { Link } from 'react-router-dom';
// import LogoDark from '/images/logos/Logo.png';
import { styled } from '@mui/material';
import { useSelector } from 'react-redux';


const Logo = (props) => {
  const url = useSelector((state)=>state.Api.imageServer)
  const WebSrn = localStorage.getItem('WebSrn')

  const LinkStyled = styled(Link)(() => ({
    height: '150px',
    width: props.width ? props.width : '210px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center'
  }));
  return (
    // <LinkStyled>
    <img 
    style={{ height: window.innerWidth >1024? false: true ? 'auto' : '95%', width: 'auto',maxHeight:"300px", marginTop:'10px', marginLeft: '5px' }} 
    src={`/images/logos/Logo1.png`}
    alt="Logo" 
    // height={window.innerWidth >1024? false: true ? 150 : 120} 
/>
   // </LinkStyled>
  )
};

export default Logo;
