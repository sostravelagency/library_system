import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// この関数は、新しい情報とユーザーIDをAPIに送信することで、ユーザーの情報を更新します
const update_user= async (userName, phoneNumber, address, email, id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/user/update", // ユーザーを更新するためのAPIエンドポイント
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken") // APIにアクセスするための認証トークン
        },
        data: {
            userName, phoneNumber, address,email, user_id: id //新しいユーザー名、電話番号、住所、メールアドレス、更新するユーザーのID
        }
    })
    const result= await res.data
    return result
}

export default update_user
