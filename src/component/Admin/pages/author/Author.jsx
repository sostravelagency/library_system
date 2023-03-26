import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import AddAuthor from "./AddAuthor";
import get_list_author from "../../../../api/author/get_list_author";
import delete_author from "../../../../api/author/delete_author";
import { DeleteOutline } from "@material-ui/icons";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "semantic-ui-react";
import swal from "sweetalert";
import UpdateAuthor from "./UpdateAuthor";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Author() {
  const [data, setData] = useState([]);
  const [authorId, setAuthorId] = useState();
  const [open, setOpen] = useState(false);
  console.log("data: ", data);

  async function fetchData() {
    const res = await get_list_author();
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
      field: "author_avatar",
      headerName: "Avatar",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.author_avatar}
              alt=""
            />
          </div>
        );
      },
    },
    { field: "author_name", headerName: "Name", width: 200 },
    { field: "author_gender", headerName: "Gender", width: 120 },
    { field: "author_email", headerName: "Email", width: 120 },
    {
      field: "author_brithday",
      headerName: "Birthday",
      width: 120,
      renderCell: (params) => {
        return new Date(params.row.author_brithday).toLocaleDateString();
      },
    },
    { field: "author_phone", headerName: "Phone", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <UpdateAuthor
              authorId={params.row.author_id}
              fetchData={fetchData}
            />
            <DeleteOutline
              className="bookListDelete"
              // onClick={() => handleDelete(params.row.book_id)}
              onClick={() => {
                setAuthorId(params.row.author_id);
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
      <AddAuthor fetchData={fetchData} />
      <div style={{ marginBottom: 8 }}>Danh sách book</div>
      {/* <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row.author_id}
      /> */}
      {data.length > 0 ? (
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(row) => row.author_id}
          getRowHeight={() => "auto"}
        />
      ) : (
        <div>Loading data...</div>
      )}

      {/* <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row.author_id}
        getRowHeight={() => "auto"}
      /> */}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Bạn có muốn xóa tác giả này không?"}</DialogTitle>
        <DialogActions>
          <Button
            color={"facebook"}
            onClick={async () => {
              const result = await delete_author(authorId);
              // console.log("result: ", result);
              if (result?.delete === true) {
                swal(
                  "Thông báo",
                  "Bạn đã xóa tác giả thành công",
                  "success"
                ).then(() => {
                  fetchData();
                  handleClose();
                });
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

export default Author;
