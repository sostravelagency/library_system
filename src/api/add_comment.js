import axios from "axios"
import { API_URL } from "../config"

// This function adds a new comment to a book
const addComment= async (comment_id, book_id, user_id, content, time_created)=> {
    const res= await axios({
        url: API_URL+ "/api/comment/add",
        method: "post",
        data: {
            comment_id, book_id, user_id, content, time_created
        }
    })
    const result= await res.data
    return result
}

export default addComment