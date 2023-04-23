import axios from "axios";
import { API_URL } from "../../config";

// サーバーから著者リストを取得する関数
const get_list_author = async () => {
  const res = await axios({
    url: API_URL + "/api/v3/author",
    method: "get",
  });
  const result = await res.data;
  return result;
};

export default get_list_author;
