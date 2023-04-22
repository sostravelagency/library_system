import axios from "axios";
import { API_URL } from "../../config";

// This function fetches a list of books from the server
const get_list_book = async () => {
  const res = await axios({
    url: API_URL + "/api/v3/book",
    method: "get",
  });
  const result = await res.data;
  return result;
};

export default get_list_book;
