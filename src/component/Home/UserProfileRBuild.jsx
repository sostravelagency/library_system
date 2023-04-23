import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {FaUserAlt } from "react-icons/fa"
import UserProfile from './UserProfile';
import PersonIcon from '@mui/icons-material/Person';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserProfileRBuild(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{fontFamily:'Open Sans'}}>
      <Button variant="black" onClick={handleClickOpen} style={{border: "1px solid #000000", borderRadius: "4px",}}>
        <div className={"c-flex-center"} style={{cursor: "pointer"}}>
            <FaUserAlt size={20} />
        </div>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Information user"}</DialogTitle>
        <DialogContent>
          <UserProfile {...props} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
