import axios from "axios";
import { API_URL } from "../../config";

// この関数は、新しい著者をサーバーに追加するためのPOSTリクエストを送信し、結果を返します
const add_author = async (
  authorName,
  authorAvatar,
  authorBirthday,
  authorEmail,
  authorGender,
  authorPhone
) => {
  const res = await axios({
    url: API_URL + "/api/v3/author", // 新しい著者を追加するためのURLエンドポイント
    method: "post",
    data: {
      author_name: authorName,
      author_gender: authorGender,
      author_email: authorEmail,
      author_brithday: authorBirthday,
      author_avatar: authorAvatar,
      author_phone: authorPhone,
    },
  });
  const result = await res.data;
  return result;
};

export default add_author;
