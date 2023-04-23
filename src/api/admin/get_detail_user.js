import axios from "axios";
import { API_URL } from "../../config";

// この関数は、userIdによってユーザーのプロファイル詳細を取得します
const get_detail_user = async (userId) => {
  // APIエンドポイントにGETリクエストを送信して、ユーザープロファイル情報を取得します
  const res = await axios({
    url: API_URL + "/api/v3/user/profile?id=" + userId,
    method: "get",
  });
  const result = await res.data;
  return result;
};

export default get_detail_user;
