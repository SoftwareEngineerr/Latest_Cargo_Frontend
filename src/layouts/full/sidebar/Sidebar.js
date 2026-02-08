import { useMediaQuery, Box, Drawer, Paper, Typography } from '@mui/material';
// import Logo from '../shared/logo/Logo';
import Logo from '../../../components/Logo/Logo';
import SidebarItems from './SidebarItems';
import { Upgrade } from './Updrade';
import WasilyLogo from '../../../components/Logo/wasilylogo';

const Sidebar = (props) => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    const branchItems = JSON.parse(sessionStorage.getItem("User_Data"));
    // //console.log(token)
  // const style = Theme
  // //console.log(lgUp)

  const sidebarWidth = '280px';

  if (lgUp) {
    return (
      <Box
        sx={{
          width: (theme)=>theme.palette.sidemenutext.width,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: (theme)=>theme.palette.sidemenutext.width,
              boxSizing: 'border-box',
              background: (theme) => theme.palette.sidemenutext.background
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: '100%',
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box px={0} sx={{display: (theme)=>theme.palette.sidemenutext.display.display}}>
              {/* <Logo width="100%" /> */}
              <WasilyLogo width="100%" />
            </Box>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 1,
                      borderRadius: 3,
                      background: 'linear-gradient(145deg, #fffaf5, #fff)',
                      border: '1px solid #ffe0b2',
                      transition: 'all 0.3s ease',
                      textAlign: 'center',
                      margin: '20px',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(255, 152, 0, 0.2)',
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: '#ff9800',
                        fontWeight: 600,
                        mb: 1,
                        letterSpacing: 0.5,
                      }}
                    >
                    </Typography>
                    {/* [{"phone1":2147483647,"address":"Aino mina kandahar","details":"","whatsapp":"","origin":"KDR","srn":1}] */}
                      {branchItems ? branchItems.branch.origin : null} : 
                      {branchItems ? branchItems.branch.phone1  : null}

                      {/* {"srn":2,"username":"kabul_branch01","phone1":700456789,"phone2":790123456,"address":"Street 12, Karte 3, Kabul, Afghanistan","logo":"https://example.com/uploads/branch-logo.png","googlemap":"https://goo.gl/maps/Af123kLmNoP","whatsapp":"0700456789","status":1,"main_branch":0,"details":"Main Kabul branch located near central market. Offers quick delivery and parcel tracking.","createdBy":1} */}
                  </Paper>
            
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
              <Box sx={{display: (theme)=>theme.palette.sidemenutext.display.display}}>
                <Upgrade />
              </Box>
            </Box>
            
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
          background: (theme) => theme.palette.sidemenutext.background
        },
      }}
      >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
      <Upgrade />
    </Drawer>
  );
};

export default Sidebar;
