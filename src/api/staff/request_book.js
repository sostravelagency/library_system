import axios from "axios"
import { API_URL } from "../../config"

// この関数はリクエストオーダーに関するものです
const request_book= async ()=> {
    const res= await axios({
        url: API_URL+ "/staff/request-book",
        method: "get",
    })
    const result= await res.data
    return result
}

export default request_book
