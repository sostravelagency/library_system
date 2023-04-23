import axios from "axios"
import { API_URL } from "../config"

// 非同期関数「get_comment」を定義する
const getComment= async (book_id)=> {
    const res= await axios({
        url: API_URL+ "/api/comment/",
        method: "get",
        params: {
            book_id
        }
    })
    const result= await res.data
    return result
}

export default getComment
