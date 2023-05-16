import { CalendarMonth, FilterAltOutlined } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import Fade from "@mui/material/Fade";
import React, { useState } from "react";
import Content from "./Content";

function Main() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = useState("All Launches");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseMenu = (data) => {
    setValue(data);
    setAnchorEl(null);
  };
  return (
    <div>
      <Box
        borderBottom="1px solid #F0F0F1"
        display="flex"
        justifyContent="center"
      >
        <img src="spacex.png" height="70px" width="220px" alt="...." />
      </Box>

      <Box sx={{ width: "80%", margin: "auto", pt: "10px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Button
              sx={{ color: "#364250", fontWeight: "bold" }}
              id="aria-label"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              startIcon={<CalendarMonth fontSize="small" />}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Past 6 Months
            </Button>
          </Box>
          <Box>
            <Button
              sx={{ color: "#364250", fontWeight: "bold" }}
              id="aria-label"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              startIcon={<FilterAltOutlined fontSize="small" />}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {value}
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              value={value}
            >
              <MenuItem onClick={() => handleCloseMenu("All Launches")}>
                All Launches
              </MenuItem>
              <MenuItem onClick={() => handleCloseMenu("UpComming Launches")}>
                Upcomming Launches
              </MenuItem>
              <MenuItem onClick={() => handleCloseMenu("Success Launches")}>
                Successfull Launches
              </MenuItem>
              <MenuItem onClick={() => handleCloseMenu("failed Launches")}>
                Failed Launches
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Content value={value} />
      </Box>
    </div>
  );
}

export default Main;
