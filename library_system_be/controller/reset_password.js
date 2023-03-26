const connection = require("../database/connect");
const asyncHandler = require("express-async-handler");
const md5 = require("md5");

const reestPassword = asyncHandler(async (req, res) => {
  try {
    const [rows] = await connection.execute(
      "SELECT user_id, role FROM user WHERE user_email= ? AND user_password=? ",
      [req.body.user_email, md5(req.body.old_password)]
    );
    console.log(rows);
    if (rows.length > 0) {
      // Reset password
      await connection.execute(
        "UPDATE user SET user_password= ? WHERE user_id= ?",
        [md5(req.body.new_password), rows[0].user_id]
      );
      return res.status(200).json({ reset_password: true });
    } else {
      return res.status(400).json({ reset_password: false });
    }
  } catch (error) {
    return res.status(400).json({ reset_password: false });
  }
});

module.exports = reestPassword;
