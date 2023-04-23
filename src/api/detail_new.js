import axios from "axios"
import { API_URL } from "../config"

// この関数は、IDに基づいてニュース記事の詳細を取得します
const detail_new= async (new_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/news/detail",
        method: "get",
        params: {
            new_id
        }
    })
    const result= await res.data
    return result
}

export default detail_new
