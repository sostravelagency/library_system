import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// サーバーからブログのリストを取得する関数
const get_list_blog= async ()=> {
    // アクセストークンを使用して認証ヘッダーを設定する
    const res= await axios({
        url: API_URL+ "/api/v3/blogs/get",
        method: "get",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken") // アクセストークンを使用して認証ヘッダーを設定する
        }

    })
    const result= await res.data
    return result
}

export default get_list_blog
