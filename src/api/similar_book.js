import axios from "axios"
import { API_URL } from "../config"

const similar_book= async (book_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v2/similar/book/"+ book_id,
        method: "get",
    })
    const result= await res.data
    return result

}

export default similar_book