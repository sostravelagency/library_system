import axios from "axios"
import { API_URL } from "../config"

// 非同期関数 "search" を定義
const search= async (query)=> {
    const res= await axios({
        url: API_URL+ "/api/search",
        method: "get",
        params: {
            query
        }
    })
    const result= await res.data
    return result
}

export default search
