import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useInView } from "react-intersection-observer";
import similar_book from "../../../../../api/similar_book";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function SimilarBookStatus(props) {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      if (inView === true) {
        const result = await similar_book(props?.book_id);
        return setData(result);
      }
    })();
  }, [props?.book_id, inView]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Watch similar book status
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Similar book status"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}
            >
              <TableContainer ref={ref} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Book id</TableCell>
                      <TableCell align="left">Book name</TableCell>
                      <TableCell align="left">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{row.book_in_book_id}</TableCell>
                        <TableCell align="left">{row.book_name}</TableCell>
                        <TableCell align="left">{<RenderStatus status={row?.state}
                                is_borrow={row?.is_borrow} />}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const RenderStatus = ({ status, is_borrow }) => {
  if (status === 1 && is_borrow === 1) {
    return <span style={{ color: "#2dc275" }}>Approve</span>;
  }
  if (status === 2) {
    return <span style={{ color: "red" }}>Reject</span>;
  }
  if (status === 3) {
    return <span style={{ color: "orange" }}>Finish</span>;
  }
  if (status === 1 && is_borrow === 0) {
    return <span style={{ color: "#2e89ff" }}>Wating</span>;
  }
  if (status === 4) {
    <span style={{ color: "gray" }}>Overdue</span>;
  }
  return <span>No action</span>;
};
