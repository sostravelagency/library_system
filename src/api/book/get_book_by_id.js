import axios from "axios";
import { API_URL } from "../../config";

// ブックIDパラメータを受け取る関数を定義する
const get_book_by_id = async (book_id) => {
  const res = await axios({
    url: API_URL + "/api/v3/book/detail?id=" + book_id,
    method: "get",
    // パラメータ: {
    //   book_id,
    // },
  });
  const result = await res.data;
  return result;
};

export default get_book_by_id;
