import axios from "axios";
import { API_URL } from "../../config";

const put_author = async (
  authorId,
  authorName,
  authorAvatar,
  authorBirthday,
  authorEmail,
  authorGender,
  authorPhone
) => {
  const res = await axios({
    url: API_URL + "/api/v3/author",
    method: "put",
    data: {
      author_id: authorId,
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

export default put_author;
