import {
  LineStyle,
  PermIdentity,
  // eslint-disable-next-line
  DynamicFeed,
  // eslint-disable-next-line
  Report,
} from "@material-ui/icons";
import { NavLink as Link } from "react-router-dom";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import BookIcon from "@mui/icons-material/Book";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CategoryIcon from "@mui/icons-material/Category";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../../Socket/Socket";
export default function Sidebar() {
  const {socketState }= useContext(SocketContext)
  const [notification, setNotification]= useState(0)
  useEffect(()=> {
    (async ()=> {
      
    })()
  }, [])
  const ref= useRef()
  useEffect(()=> {
    socketState?.on("new_request_borrow")
  }, [])
  return (
    <div ref={ref} className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/staff/" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <LineStyle className="sidebarIcon" />
                    Home
                </li>)
              }
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Request</h3>
          <ul className="sidebarList">
            <Link to="/staff/request" className="link">
                {
                  (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <EqualizerIcon className="sidebarIcon" />
                    <div style={{position: "relative"}}>Borrow / return books
                      <div style={{position: "absolute", right: -10, top: "-50%", fontSize: 13, padding: 5, color: "#fff", background: 'red', borderRadius: "50%", width: 20, height: 20, display: "flex", justifyContent: "center", alignItems: 'center'}}>4</div>
                    </div>
                </li>)
                }
              
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Inbox</h3>
          <ul className="sidebarList">
            <Link to="/staff/feedback/message" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <PermIdentity className="sidebarIcon" />
                    Message
                </li>)
              }
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Manage book</h3>
          <ul className="sidebarList">
            <Link to="/staff/books" className="link">
              {({ isActive }) => (
                <li
                  className={`sidebarListItem ${
                    isActive === true ? "active" : ""
                  }`}
                >
                  <BookIcon className="sidebarIcon" />
                  Books
                </li>
              )}
            </Link>
            <li className="sidebarListItem">
              <Link to="/staff/category" className="link">
                {({ isActive }) => (
                  <li
                    className={`sidebarListItem ${
                      isActive === true ? "active" : ""
                    }`}
                  >
                    <CategoryIcon className="sidebarIcon" />
                    Categories
                  </li>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
