import axios from "axios"
import { API_URL } from "../config"

// 非同期関数「get_detail_book」を定義する
const get_detail_book= async (book_id)=> {
    const res= await axios({
        url: API_URL+ "/api/book",
        method: "get",
        params: {
            book_id
        }
    })
    const result= await res.data
    return result
}

export default get_detail_book
