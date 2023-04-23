import axios from "axios";
import { API_URL } from "../../config";

// 与えられたIDで著者を削除するためにこの関数を使用します
const delete_author = async (id) => {
  const res = await axios({
    url: API_URL + "/api/v3/author?id=" + id, // 与えられたIDでAPIエンドポイントにDELETEリクエストを送信します
    method: "delete",
  });
  const result = await res.data;
  return result;
};

export default delete_author;
