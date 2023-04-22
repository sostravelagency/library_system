import axios from "axios";
import { API_URL } from "../../config";

const put_reset_password = async (oldPassword, newPassword, userEmail) => {
  try {
    const res = await axios({
      url: API_URL + "/api/v3/user/reset-password", //API endpoint for resetting user's password
      method: "put",
      data: {
        old_password: oldPassword, // old password entered by the user
        new_password: newPassword, // new password entered by the user
        user_email: userEmail, // email of the user whose password needs to be reset
      },
    });
    const result = await res.data;
    return result;
  } catch (error) {
    return error;
  }
};

export default put_reset_password;
