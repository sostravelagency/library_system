import axios from "axios";
import { API_URL } from "../../config";

// Asynchronously gets the author's details by their ID
const get_author_by_id = async (book_id) => {
  // Sends a GET request to the server to retrieve the author's details
  const res = await axios({
    url: API_URL + "/api/v3/author/detail?id=" + book_id,
    method: "get",
  });
  const result = await res.data;
  return result;
};

export default get_author_by_id;
