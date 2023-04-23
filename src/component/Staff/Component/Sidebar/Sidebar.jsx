import {
  LineStyle,
  PermIdentity,
  // eslint-disable-next-line
  DynamicFeed,
  // eslint-disable-next-line
  Report,
} from "@material-ui/icons";
import { NavLink as Link, useLocation } from "react-router-dom";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import BookIcon from "@mui/icons-material/Book";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CategoryIcon from "@mui/icons-material/Category";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../../Socket/Socket";
import get_notification from "../../../../api/staff/get_notification";
import seen_request from "../../../../api/staff/seen_request";
export default function Sidebar() {
  const {socketState }= useContext(SocketContext)
  const [notification, setNotification]= useState(0)
  const [notificationOrder, setNottificationOrder]= useState(0)
  const [notificationMessage, setNotificationMessage]= useState(0)
  const location= useLocation()
  
  const send_request_2= ()=> {
    seen_request()
    setNottificationOrder(0)
  }
  useEffect(()=> {
    (async ()=> {
      const result= await get_notification()
      setNottificationOrder(result?.filter(item=> parseInt(item?.type)=== 0)?.length || 0)
      setNotificationMessage(result?.filter(item=> parseInt(item?.type)=== 1)?.length || 0)
      return setNotification(result)
    })()
  }, [])
  const ref= useRef()
  useEffect(()=> {
    socketState?.on("new_request_borrow", (data)=> {
      setNottificationOrder(prev=> parseInt(prev)+ 1)
    })
  }, [])
  useEffect(()=> {
    const intervalId= setInterval(()=> {
      if(location.pathname=== "/staff/request") {
        send_request_2()
      }
    }, 5000)

    return ()=> clearInterval(intervalId)
  }, [location.pathname])
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
          <h3 className="sidebarTitle">Yêu cầu</h3>
          <ul className="sidebarList">
            <Link onClick={()=> send_request_2()} to="/staff/request" className="link">
                {
                  (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <EqualizerIcon className="sidebarIcon" />
                    <div style={{position: "relative"}}>Borrow / return books
                      <div style={{position: "absolute", right: -10, top: "-50%", fontSize: 13, padding: 5, color: "#fff", background: 'red', borderRadius: "50%", width: 20, height: 20, display: "flex", justifyContent: "center", alignItems: 'center'}}>{notificationOrder}</div>
                    </div>
                </li>)
                }
              
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Feedback</h3>
          <ul className="sidebarList">
            <Link to="/staff/feedback/message" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <PermIdentity className="sidebarIcon" />
                    Tin nhắn
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
