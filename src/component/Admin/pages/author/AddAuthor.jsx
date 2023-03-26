import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import swal from "sweetalert";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import { Button } from "semantic-ui-react";
import { TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import add_author from "../../../../api/author/add_author";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

function AddAuthor({ fetchData }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(null);
  const [valueForm, setValueForm] = useState({
    authorName: "",
    authorAvatar: "",
    authorBirthday: "",
    authorEmail: "",
    authorGender: "",
    authorPhone: "",
  });

  const [errorForm, setErrorForm] = useState({
    authorName: "",
    authorAvatar: "",
    authorBirthday: "",
    authorEmail: "",
    authorGender: "",
    authorPhone: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValueForm({
      ...valueForm,
      [name]: value.trim(),
    });
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        style={{ margin: "8px 0", display: "flex", alignItems: "center" }}
      >
        <span>Thêm tác giả</span>
        <AddIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>{"Thêm tác giả"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              fullWidth
              placeholder={"Tên tác giả"}
              value={valueForm.authorName}
              name="authorName"
              onChange={handleChange}
              helperText={
                errorForm.authorName.length > 0 ? errorForm.authorName : ""
              }
              error={errorForm.authorName.length > 0 ? true : false}
            />
            <RedBar />
            <TextField
              fullWidth
              placeholder={"Ảnh đại diện"}
              value={valueForm.authorAvatar}
              name="authorAvatar"
              onChange={handleChange}
              helperText={
                errorForm.authorAvatar.length > 0 ? errorForm.authorAvatar : ""
              }
              error={errorForm.authorAvatar.length > 0 ? true : false}
            />
            <RedBar />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={value}
                  onChange={(newValue) => {
                    const convertedDate = new Date(newValue).toISOString();
                    // console.log("convertedDate", convertedDate);
                    setValue(newValue);
                    setValueForm({
                      ...valueForm,
                      authorBirthday: convertedDate,
                    });
                  }}
                  disableFuture
                  slotProps={{
                    textField: {
                      helperText:
                        !value || valueForm?.authorBirthday > 0
                          ? "Chọn ngày"
                          : "",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <RedBar />
            <TextField
              fullWidth
              name="authorEmail"
              value={valueForm.authorEmail}
              onChange={handleChange}
              placeholder={"Email"}
              helperText={
                errorForm.authorEmail.length > 0 ? errorForm.authorEmail : ""
              }
              error={errorForm.authorEmail.length > 0 ? true : false}
            />
            <RedBar />
            <TextField
              fullWidth
              name="authorPhone"
              value={valueForm.authorPhone}
              onChange={handleChange}
              placeholder={"Số điện thoại"}
              helperText={
                errorForm.authorPhone.length > 0 ? errorForm.authorPhone : ""
              }
              error={errorForm.authorPhone.length > 0 ? true : false}
            />
            <RedBar />
            <TextField
              fullWidth
              name="authorGender"
              value={valueForm.authorGender}
              onChange={handleChange}
              placeholder={"Giới tính"}
              helperText={
                errorForm.authorGender.length > 0 ? errorForm.authorGender : ""
              }
              error={errorForm.authorGender.length > 0 ? true : false}
            />
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color={"facebook"}
            onClick={async () => {
              setLoading(true);
              let isValid = true;
              const newError = {
                authorName: "",
                authorAvatar: "",
                authorBirthday: "",
                authorEmail: "",
                authorGender: "",
                authorPhone: "",
              };
              if (valueForm.authorName.length === 0) {
                isValid = false;
                newError.authorName = "Nhập tên sách";
              } else {
                newError.authorName = "";
              }

              if (valueForm.authorAvatar.length === 0) {
                isValid = false;
                newError.authorAvatar = "Nhập số lượng";
              } else {
                newError.authorAvatar = "";
              }

              if (valueForm.authorBirthday.length === 0) {
                isValid = false;
                newError.authorBirthday = "Nhập rating";
              } else {
                newError.authorBirthday = "";
              }

              if (valueForm.authorGender.length === 0) {
                isValid = false;
                newError.authorGender = "Nhập mô tả";
              } else {
                newError.authorGender = "";
              }

              if (valueForm.authorEmail.length === 0) {
                isValid = false;
                newError.authorEmail = "Nhập tác giả";
              } else {
                newError.authorEmail = "";
              }

              if (isValid) {
                const {
                  authorName,
                  authorAvatar,
                  authorBirthday,
                  authorEmail,
                  authorGender,
                  authorPhone,
                } = valueForm;
                const res = await add_author(
                  authorName,
                  authorAvatar,
                  authorBirthday,
                  authorEmail,
                  authorGender,
                  authorPhone
                );
                // console.log("res: ", res);
                if (res?.add === true) {
                  swal(
                    "Thông báo",
                    "Bạn đã tạo tác giả thành công",
                    "success"
                  ).then(() => {
                    handleClose();
                    fetchData();
                  });
                } else {
                  swal("Thông báo", "Error", "error");
                }
                setValueForm({
                  authorName: "",
                  authorAvatar: "",
                  authorBirthday: "",
                  authorEmail: "",
                  authorGender: "",
                  authorPhone: "",
                });
                setValue("");
              }

              setErrorForm({ ...newError });
              setLoading(false);
            }}
            loading={loading}
          >
            Thêm
          </Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddAuthor;
