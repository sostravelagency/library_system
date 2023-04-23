import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// この関数は、IDを使用してAPIからブログ投稿を削除します
const delete_blog= async (id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/blog/delete",
        method: "post",
        headers: {
            // アクセストークンをクッキーから取得して認証ヘッダーを設定します
            "authorization": "Bearer "+ Cookies.get("accessToken")
        },
        data: {
            // 削除するブログ投稿のIDをリクエストボディに渡します
            id: id
        }
    })
    const result= await res.data
    return result
}

export default delete_blog
