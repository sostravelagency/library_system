import axios from "axios";
import { API_URL } from "../../config";

// サーバーに著者を更新するための関数
const put_author = async (
  authorId, // 更新する著者のID
  authorName, // 著者の新しい名前
) => {
  const res = await axios({
    url: API_URL + "/api/v3/author",
    method: "put",
    data: {
      author_id: authorId,
      author_name: authorName,
    },
  });
  const result = await res.data;
  return result;
};

export default put_author;
