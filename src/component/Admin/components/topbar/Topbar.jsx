import { Menu, MenuItem } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import "./topbar.css";
import { Link } from 'react-router-dom';

export default function Topbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };
  const Logout= ()=> {
    Cookies.remove("uid")
    Cookies.remove("accessToken")
    window.location.reload()
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
        <Link to ="/admin"><span className="logo">Admin</span></Link>
        </div>
        <div className="topRight">
          <div onClick={handleClick} className="topbarIconContainer">
            <img src="https://thumbs.dreamstime.com/b/user-glyph-icon-web-mobile-admin-sign-vector-graphics-solid-pattern-white-background-eps-user-glyph-icon-web-mobile-103294421.jpg" alt="" className="topAvatar" />
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={()=> {
              handleClose()
              Logout()
            }}>Đăng xuất</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
