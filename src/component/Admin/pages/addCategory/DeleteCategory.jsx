import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import AddIcon from '@mui/icons-material/Add';
import { Button } from "semantic-ui-react";
// import { TextField } from '@mui/material';
import swal from 'sweetalert';
// import add_category from '../../../../api/category/add_category';
import delete_category from '../../../../api/category/delete_category';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteCategory(props) {
  const [open, setOpen] = React.useState(false);
//   const [categoryName, setCategoryName]= React.useState("")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button onClick={handleClickOpen} style={{margin: "8px 0", display: "flex", alignItems: "center"}}>
          Delete
        </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to delete this?"}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField value={categoryName} onChange={(e)=> setCategoryName(e.target.value)} placeholder={"Category name"} />
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button color={"facebook"} onClick={async ()=> {
              const result= await delete_category(props?.id)
              if(result?.delete=== true) {
                swal("Notice", "Delete category successfully", "success")
                .then(()=> {
                  handleClose()
                  props?.setChange(prev=> !prev)
                })
              }
              else {
                swal("Notice", "Error", "error")
              }
          }}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}