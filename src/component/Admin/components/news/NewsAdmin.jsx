import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, TextField } from "@mui/material";
import add_blog from "../../../../api/blog/add_blog";
import swal from "sweetalert";
import UploadImage from "../../../Component/UploadImage";
import upload_image from "../../../../api/upload_image";
import { Route, Routes, useNavigate } from "react-router-dom";
import get_list_blog from "../../../../api/admin/get_list_blog";
import { DataGrid } from "@material-ui/data-grid";
import moment from "moment"
import delete_blog from "../../../../api/admin/delete_blog";

export default function NewsAdmin() {
  return (
    <Routes>
      <Route path={"/"} element={<ListBlog></ListBlog>} />
      <Route path={"/add"} element={<CreateBlog />} />
    </Routes>
  );
}


const ListBlog = () => {
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "content",
      headerName: "Content",
      width: 200,
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params)=> {
        return (
          <img src={params.row?.image} alt="" />
        )
      }
    },{
      field: "time_created",
      headerName: "Time created",
      width: 200,
      renderCell: (params)=> {
        return (
          <>{moment(params.rows?.time_created).format("DD-MM-YYYY HH:mm:ss")}</>
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div style={{ gap: 10, display: "flex", alignItems: "center" }}>
            <>
              <Button onClick={() => {
                swal("Notice", "Are you sure want to delete this blog ?", {buttons: {
                  delete: "Delete",
                  cancel: "Cancel"
                }})
                .then(async value=> {
                  if(value=== "delete") {
                    await delete_blog(params.row?.id)
                    handleDelete(params.row.id)
                    swal("Notice", "Deleted", "success")
                    setChange(prev=> !prev)
                  } 
                  else {
                    return null
                  }
                })
                
              }} variant={"contained"} color={"error"}>Delete</Button>
            </>
            <></>
          </div>
        );
      },
    },
  ];
  const navigate= useNavigate()
  const [data, setData] = useState([]);
  const [change, setChange]= useState(false)
  useEffect(() => {
    (async () => {
      const result = await get_list_blog();
      return setData(result);
    })();
  }, [change]);

  return <div className={"userList"}>
    <Button onClick={()=> navigate("/admin/news/add")} variant={"contained"} style={{marginBottom: 12}}>Add new blog</Button>
      <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={5}
          pagination={true}
          paginationMode="client"
      />
  </div>;
};

const CreateBlog = () => {
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const handleContentChange = (value) => {
    setContent(value);
    setPreviewContent(value);
  };

  return (
    <div className={"userList"}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div className="editor" style={{ flex: "1 1 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 18 }}>Title:</span>{" "}
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label={"title"}
            />
          </div>
          <UploadImage title={"Upload image blog"} setImage={setImage} />
          <div></div>
          <br />
          <ReactQuill value={content} onChange={handleContentChange} />
          <Button
            onClick={async () => {
              const imageFinal = await upload_image(image?.thumbUrl);

              const result = await add_blog(content, imageFinal, title);
              if (result?.add === true) {
                swal("Notice", "Create is successfully", "success");
              } else {
                swal("Notice", "Error", "error");
              }
            }}
            variant={"contained"}
            style={{ marginTop: 16 }}
          >
            Create
          </Button>
        </div>
        <div className="preview" style={{ flex: "1 1 0" }}>
          <h2>Preview</h2>
          <div dangerouslySetInnerHTML={{ __html: previewContent }} />
        </div>
      </div>
    </div>
  );
};
