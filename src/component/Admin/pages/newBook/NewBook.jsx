import React, { useEffect, useState } from "react";
import get_category from "../../../../api/get_category";
import get_list_author from "../../../../api/author/get_list_author";
import AddIcon from "@mui/icons-material/Add";
import add_book from "../../../../api/book/add_book";
import swal from "sweetalert";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { Button } from "semantic-ui-react";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import "./newBook.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

export default function NewBook({ fetchData }) {
  const [open, setOpen] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataAuthor, setDataAuthor] = useState([]);
  const [personAuthor, setPersonAuthor] = React.useState([]);
  const [personCategory, setPersonCategory] = React.useState([]);
  const [loading, setLoading] = useState(false);

  const [valueForm, setValueForm] = useState({
    bookName: "",
    bookQuantity: "",
    bookRating: "",
    bookDescription: "",
    coverPhoto: "",
    linkBook: "",
    categoryId: "",
  });

  const [errorForm, setErrorForm] = useState({
    bookName: "",
    bookQuantity: "",
    bookRating: "",
    bookDescription: "",
    coverPhoto: "",
    linkBook: "",
    categoryId: "",
  });

  useEffect(() => {
    (async () => {
      const result = await get_category();
      return setDataCategory(result);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await get_list_author();
      return setDataAuthor(result);
    })();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "authorId") {
      setPersonAuthor(typeof value === "string" ? value.split(",") : value);
    } else if (name === "categoryId") {
      setPersonCategory(typeof value === "string" ? value.split(",") : value);
    } else {
      setValueForm({
        ...valueForm,
        [name]: value.trim(),
      });
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        style={{ margin: "8px 0", display: "flex", alignItems: "center" }}
      >
        <span>Thêm sách</span>
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
        <DialogTitle>{"Thêm sách"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              fullWidth
              placeholder={"Tên sách"}
              value={valueForm.bookName}
              name="bookName"
              onChange={handleChange}
              helperText={
                errorForm.bookName.length > 0 ? errorForm.bookName : ""
              }
              error={errorForm.bookName.length > 0 ? true : false}
            />
            <RedBar />
            <TextField
              fullWidth
              placeholder={"Số lượng"}
              value={valueForm.bookQuantity}
              name="bookQuantity"
              onChange={handleChange}
              helperText={
                errorForm.bookQuantity.length > 0 ? errorForm.bookQuantity : ""
              }
              error={errorForm.bookQuantity.length > 0 ? true : false}
            />
            <RedBar />

            <TextField
              fullWidth
              name="bookRating"
              value={valueForm.bookRating}
              onChange={handleChange}
              placeholder={"Xếp hạng"}
              helperText={
                errorForm.bookRating.length > 0 ? errorForm.bookRating : ""
              }
              error={errorForm.bookRating.length > 0 ? true : false}
            />
            <RedBar />
            <TextField
              fullWidth
              name="coverPhoto"
              value={valueForm.coverPhoto}
              onChange={handleChange}
              placeholder={"Hình ảnh"}
              helperText={
                errorForm.coverPhoto.length > 0 ? errorForm.coverPhoto : ""
              }
              error={errorForm.coverPhoto.length > 0 ? true : false}
            />
            <RedBar />
            <TextField
              fullWidth
              name="bookDescription"
              value={valueForm.bookDescription}
              onChange={handleChange}
              placeholder={"Mô tả"}
              helperText={
                errorForm.bookDescription.length > 0
                  ? errorForm.bookDescription
                  : ""
              }
              error={errorForm.bookDescription.length > 0 ? true : false}
            />
            <RedBar />
            <Select
              onChange={handleChange}
              value={personCategory}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              name="categoryId"
              fullWidth
              // renderValue={(value) => {
              //   const findEle = dataCategory?.find(
              //     (item) => item.id === value
              //   )?.category_name;
              //   return value?.length ? findEle : "Thể loại";
              // }}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span>Thể loại</span>;
                }

                return selected.join(", ");
              }}
              multiple
              MenuProps={MenuProps}
              error={personCategory.length === 0 ? true : false}
            >
              {dataCategory?.map((item) => (
                <MenuItem value={item.category_name} key={item.category_name}>
                  {/* {item.category_name} */}
                  <Checkbox
                    checked={personCategory.indexOf(item.category_name) > -1}
                  />
                  <ListItemText primary={item.category_name} />
                </MenuItem>
              ))}
            </Select>
            {personCategory.length === 0 && (
              <FormHelperText>Chọn thể loại</FormHelperText>
            )}
            <RedBar />
            <Select
              onChange={handleChange}
              value={personAuthor}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              name="authorId"
              fullWidth
              // renderValue={(value) => {
              //   const findEle = dataAuthor?.find(
              //     (item) => item.author_id === value
              //   )?.author_name;
              //   return value?.length ? findEle : "Tác giả";
              // }}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span>Tác giả</span>;
                }

                return selected.join(", ");
              }}
              multiple
              MenuProps={MenuProps}
              error={personAuthor.length === 0 ? true : false}
            >
              {dataAuthor?.map((item) => (
                // <MenuItem value={item.author_id} key={item.author_id}>
                //   {item.author_name}
                // </MenuItem>
                <MenuItem key={item.author_name} value={item.author_name}>
                  <Checkbox
                    checked={personAuthor.indexOf(item.author_name) > -1}
                  />
                  <ListItemText primary={item.author_name} />
                </MenuItem>
              ))}
            </Select>
            {personAuthor.length === 0 && (
              <FormHelperText>Chọn tác giả</FormHelperText>
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color={"facebook"}
            onClick={async () => {
              setLoading(true);
              let isValid = true;
              const newError = {
                bookName: "",
                bookQuantity: "",
                bookRating: "",
                bookDescription: "",
                coverPhoto: "",
                linkBook: "",
                categoryId: "",
              };
              if (valueForm.bookName.length === 0) {
                isValid = false;
                newError.bookName = "Nhập tên sách";
              } else {
                newError.bookName = "";
              }

              if (valueForm.bookQuantity.length === 0) {
                isValid = false;
                newError.bookQuantity = "Nhập số lượng";
              } else {
                newError.bookQuantity = "";
              }

              if (valueForm.bookRating.length === 0) {
                isValid = false;
                newError.bookRating = "Nhập rating";
              } else {
                newError.bookRating = "";
              }

              if (valueForm.bookDescription.length === 0) {
                isValid = false;
                newError.bookDescription = "Nhập mô tả";
              } else {
                newError.bookDescription = "";
              }

              if (valueForm.coverPhoto.length === 0) {
                isValid = false;
                newError.coverPhoto = "Nhập tác giả";
              } else {
                newError.coverPhoto = "";
              }

              const filteredAuthors = dataAuthor.filter((author) =>
                personAuthor.includes(author.author_name)
              );
              const filteredCategories = dataCategory.filter((category) =>
                personCategory.includes(category.category_name)
              );
              // console.log("filteredAuthors: ", filteredAuthors);
              if (isValid) {
                const {
                  bookName,
                  bookQuantity,
                  bookRating,
                  bookDescription,
                  coverPhoto,
                  linkBook,
                } = valueForm;
                const res = await add_book(
                  bookName,
                  bookQuantity,
                  bookRating,
                  bookDescription,
                  coverPhoto,
                  filteredAuthors,
                  linkBook,
                  filteredCategories
                );
                // console.log("res: ", res);
                if (res?.add === true) {
                  swal(
                    "Thông báo",
                    "Bạn đã tạo sách thành công",
                    "success"
                  ).then(() => {
                    handleClose();
                    fetchData();
                  });
                } else {
                  swal("Thông báo", "Error", "error");
                }
                setValueForm({
                  bookName: "",
                  bookQuantity: "",
                  bookRating: "",
                  bookDescription: "",
                  coverPhoto: "",
                  authorId: "",
                  linkBook: "",
                  categoryId: "",
                });

                setPersonAuthor([]);
                setPersonCategory([]);
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
