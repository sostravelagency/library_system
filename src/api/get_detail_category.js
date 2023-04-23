import axios from "axios"
import { API_URL } from "../config"

// 非同期関数「get_detail_category」を定義する
const get_detail_category= async (category_id)=> {
    const res= await axios({
        url: API_URL+ "/api/category/detail",
        method: "get",
        params: {
            category_id
        }
    })
    const result= await res.data
    return result
}

export default get_detail_category
