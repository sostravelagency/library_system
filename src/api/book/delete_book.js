import axios from "axios";
import { API_URL } from "../../config";

// この関数は、サーバーから本を削除するための削除リクエストを送信します
const delete_book = async (id) => {
  const res = await axios({
    url: API_URL + "/api/v3/book?id=" + id,
    method: "delete",
  });
  const result = await res.data;
  return result;
};

export default delete_book;
