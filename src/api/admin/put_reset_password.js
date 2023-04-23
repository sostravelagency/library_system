import axios from "axios";
import { API_URL } from "../../config";

const put_reset_password = async (oldPassword, newPassword, userEmail) => {
  try {
    const res = await axios({
      url: API_URL + "/api/v3/user/reset-password", // ユーザーのパスワードをリセットするためのAPIエンドポイント
      method: "put",
      data: {
        old_password: oldPassword, // ユーザーが入力した古いパスワード
        new_password: newPassword, // ユーザーが入力した新しいパスワード
        user_email: userEmail, // パスワードをリセットするユーザーのメールアドレス
      },
    });
    const result = await res.data;
    return result;
  } catch (error) {
    return error;
  }
};

export default put_reset_password;

