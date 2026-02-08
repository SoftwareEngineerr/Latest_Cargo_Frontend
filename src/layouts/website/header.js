import React from "react";
import { AppBar, Toolbar, Box, Typography, IconButton, Menu, MenuItem, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const menuItems = [
    { label: "کورپانه", link: "../pa.html" },
    { label: "زموږ په اړه", link: "./about-us.html" },
    { label: "خدمتونه", link: "./services.html" },
    { label: "څانګي", link: "./branches.html" },
    { label: "مطلبونه", link: "./blogs.html" },
    { label: "اریکه", link: "./contact-us.html" },
  ];

  return (
    <AppBar position="fixed" color="inherit" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>

        {/* LOGO */}
        <Box display="flex" alignItems="center" gap={1}>
          <img
            src="../uploaded/ilgar1758097364.jpg"
            alt="Logo"
            style={{ height: 40, borderRadius: 4 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#2c3e50" }}>
            قاطع کندهار انتقالات
          </Typography>
        </Box>

        {/* DESKTOP MENU */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {menuItems.map((item, index) => (
            <Button
              key={index}
              href={item.link}
              sx={{ fontSize: 16, fontWeight: 500, color: "#333" }}
            >
              {item.label}
            </Button>
          ))}

          {/* Login Icon */}
          <IconButton href="./login">
            <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"></path>
            </svg>
          </IconButton>
        </Box>

        {/* MOBILE MENU BUTTON */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={handleOpenMenu}
        >
          <MenuIcon />
        </IconButton>

        {/* MOBILE MENU DROPDOWN */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          PaperProps={{ sx: { width: 250 } }}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={handleCloseMenu}
              component="a"
              href={item.link}
            >
              {item.label}
            </MenuItem>
          ))}

          <MenuItem component="a" href="./login">
            <Box display="flex" alignItems="center" gap={1}>
              <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"></path>
              </svg>
              Login
            </Box>
          </MenuItem>
        </Menu>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
