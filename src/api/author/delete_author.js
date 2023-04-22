import axios from "axios";
import { API_URL } from "../../config";

// This function is used to delete an author with the given id
const delete_author = async (id) => {
  const res = await axios({
    url: API_URL + "/api/v3/author?id=" + id, // Send a DELETE request to the API endpoint with the given id
    method: "delete",
  });
  const result = await res.data;
  return result;
};

export default delete_author;
