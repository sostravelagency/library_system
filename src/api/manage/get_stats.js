import axios from "axios"
import { API_URL } from "../../config"

//API_URL/v2/statsエンドポイントから統計データを非同期で取得します。
const get_stats= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/v2/stats",
        method: "get",

    })
    const result= await res.data
    return result
}

export default get_stats
