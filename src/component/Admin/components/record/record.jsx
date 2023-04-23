// import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import delete_user from "../../../../api/admin/delete_user";
// import get_list_user from "../../../../api/admin/get_list_user";
// import get_list_staff from "../../../../api/admin/get_list_staff";
import swal from "sweetalert"
import get_list_record from "../../../../api/admin/get_list_record";

export default function ManageRecord() {
  const [data, setData] = useState([]);
  const [change, setChange]= useState(false)
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(()=> {
    (async()=> {
      const result= await get_list_record()
      return setData(result)
    })()
  }, [change])
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user_name",
      headerName: "Username",
      width: 200,
    },
    { field: "book_name", headerName: "Book", width: 350 },
    {
        field: "status",
        width: 350,
        headerName: "Status",
        renderCell: (params)=> {
            if(params.row.state=== 0) {
                return <span style={{color: "#2e89ff"}}>Pending</span>
            }
            if(params.row.state=== 1 && params.row.is_borrow=== 1) {
                return <span style={{color: "#3bb077"}}>Approved</span>
            }
            if(params.row.state=== 1 && params.row.is_borrow=== 0) {
                return <span style={{color: "#3bb077"}}>Waiting</span>
            }
            if(params.row.state=== 2) {
                return <span style={{color: "red"}}>Declined</span>
            }
            if(params.row.state=== 3) {
                return <span style={{color: "orange"}}>Finish</span>
            }
            if(params.row.state=== 4) {
                return <span style={{color: "gray"}}>Overdue</span>
            }
            if(params.row.state=== 5) {
                return <span style={{color: "aqua"}}>Request book back</span>
            }
            return <>Unknown</>
        }
    }
  ];

  return (
    <div className="userList">
      <div style={{height: 500}}> 
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          checkboxSelection
          pageSize={5}
          pagination={true}
          paginationMode="client"
        />
      </div>
    </div>
  );
}
