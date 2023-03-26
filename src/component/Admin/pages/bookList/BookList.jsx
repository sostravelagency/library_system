import "./bookList.css";
import { DeleteOutline } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import get_list_book from "../../../../api/book/get_list_book";
import delete_book from "../../../../api/book/delete_book";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "semantic-ui-react";
import swal from "sweetalert";
import NewBook from "../newBook/NewBook";
import Book from "../book/Book";
import { DataGrid } from "@material-ui/data-grid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductList() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [bookId, setBookId] = useState();

  async function fetchData() {
    const res = await get_list_book();
    // const res = [];
    setData(res);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    // { field: "book_id", headerName: "ID", width: 90 },
    {
      field: "cover_image",
      headerName: "Cover image",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.cover_photo}
              alt=""
            />
            {/* {params.row.name} */}
          </div>
        );
      },
    },
    { field: "book_name", headerName: "Name", width: 200 },
    { field: "book_quantity", headerName: "Quantity", width: 120 },
    { field: "book_rating", headerName: "Rating", width: 120 },
    {
      field: "author_name",
      headerName: "Author",
      width: 180,
      renderCell: (params) => {
        return params.row.auths?.map((item, idx) => {
          return (
            <span key={"book-list-" + idx}>{item.author_name + ", "}</span>
          );
        });
        // return <>{/* <span>{params.row.auths}</span> */}</>;
      },
    },
    { field: "book_description", headerName: "Description", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/admin/book/" + params.row.book_id}>
              <button className="bookListEdit">Edit</button>
            </Link> */}
            <Book bookId={params.row.book_id} fetchData={fetchData} />
            <DeleteOutline
              className="bookListDelete"
              // onClick={() => handleDelete(params.row.book_id)}
              onClick={() => {
                setBookId(params.row.book_id);
                setOpen(true);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <NewBook fetchData={fetchData} />
      <div style={{ marginBottom: 8 }}>Danh sách book</div>

      <DataGrid
        rows={data}
        columns={columns}
        disableSelectionOnClick
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row.book_id}
        getRowHeight={() => "auto"}
      />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Bạn có muốn xóa sách này không?"}</DialogTitle>
        <DialogActions>
          <Button
            color={"facebook"}
            onClick={async () => {
              const result = await delete_book(bookId);
              if (result?.delete === true) {
                swal("Thông báo", "Bạn đã xóa sách thành công", "success").then(
                  () => {
                    fetchData();
                    handleClose();
                  }
                );
              } else {
                swal("Thông báo", "Error", "error");
              }
            }}
          >
            Xóa
          </Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
