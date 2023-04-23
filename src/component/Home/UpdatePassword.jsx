import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import update_password from '../../api/update_password';
import swal from 'sweetalert';
import validateConfirmPassword from '../../util/validateConfirmPassword';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdatePassword() {
  const [open, setOpen] = React.useState(false);
  const [oldPassword, setOldPassword]= React.useState("")
  const [newPassword, setNewPassword]= React.useState("")
  const [confirmNewPassword, setConfirmNewPassword]= React.useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update password
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update Password"}</DialogTitle>
        <DialogContent style={{minWidth: 700}}>
              <TextField type="password" style={{width: 550, height: 40, marginTop: 12}} value={oldPassword} onChange={(e)=> setOldPassword(e.target.value)} label={"Old password"} />
              <div></div>
              <br />
              <div></div>
              <TextField style={{width: 550, height: 40, marginTop: 12}} value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} label={"New password"} />
              <div></div>
              <br />
              <div></div>
              <TextField style={{width: 550, height: 40, marginTop: 12}} value={confirmNewPassword} onChange={(e)=> setConfirmNewPassword(e.target.value)} label={"Repeat new password"} />
              <div></div>
              <br />
              <div></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={async ()=> {
            try {
              if(validateConfirmPassword(newPassword, confirmNewPassword)=== false ) {
                return swal("Notice", "Password confirm is not match", "error")
              }
              const result= await update_password(oldPassword, newPassword)
              if(result?.change=== true) {
                swal("Notice", "Password is updated successfully", "success")
              }
              else {
                swal("Notice", "Password is not correct", "error")
              }
            }
            catch(e) {
              swal("Notice", "Error", "error")
            }
          } }>Update</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
