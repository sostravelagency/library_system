import axios from "axios";
import { API_URL } from "../../config";

// This function sends a POST request to add a new author to the server
// and returns the result
const add_author = async (
  authorName,
  authorAvatar,
  authorBirthday,
  authorEmail,
  authorGender,
  authorPhone
) => {
  const res = await axios({
    url: API_URL + "/api/v3/author", // The URL endpoint to add a new author
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
