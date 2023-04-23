import axios from "axios";
import { API_URL } from "../../config";

// このコードコメントは日本語です
const get_author_by_id = async (book_id) => {
  // サーバーに著者の詳細を取得するためのGETリクエストを送信します
  const res = await axios({
    url: API_URL + "/api/v3/author/detail?id=" + book_id,
    method: "get",
  });
  const result = await res.data;
  return result;
};

export default get_author_by_id;
