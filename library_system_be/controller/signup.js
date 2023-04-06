const connection = require("../database/connect")
const asyncHandler = require('express-async-handler')
const {v4}= require("uuid")
const md5 = require("md5")
const nodemailer = require('nodemailer');
const verifyMail = require("../utils/mail");

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const signup = {
    signUp: asyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT user_id FROM user WHERE user_email= ?", [req.body.email])
            if(rows.length > 0) {
                const [rows]= await connection.execute("SELECT * FROM verify_email WHERE verify_email= ?", [req.body.email]);
                if(rows.length > 0) {
                    return res.status(200).json({signup: true, exist: true, verify_email: false, mess:"Email đã đăng ký nhưng chưa xác thực, Vui lòng nhập mã xác thực được gửi vào email bạn."})
                }
                return res.status(400).json({signup: false, exist: true, verify_email: false, mess:"Email đã tồn tại, vui lòng dùng email khác."})
            }
            else {
                // eslint-disable-next-line
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'topcheckin.career@gmail.com',
                      pass: 'qghronongsarncvs',
                    },
                  });
                  const code = Math.floor(Math.random() * 99999 + 10000);
                  let html = "<h1>VERIFY YOUR EMAIL</h1><h2>"+code+"</h2><span>Trên đây là mã OTP để xác thực tài khoản email của bạn. Vui lòng không chia sẽ cho bất cứ ai.</span>";
                  const subject = "Verify your email"
                  const mailConfigurations = {
                    from: 'topcheckin.career@gmail.com',
                    to: req.body.email,
                    subject,
                    html,
                  };
                  transporter.sendMail(mailConfigurations, function (error) {
                    if (error) {
                     
                    }else{
                        console.log("Code send successfully!!");
                    }
                  });
                  await connection.execute("INSERT INTO verify_email VALUES(?, ?, ?, ?)",
                  [
                    v4(),
                    code,
                    req.body.email,
                    'current_timestamp()'
                  ]);

                await connection.execute("INSERT INTO user VALUES(?, ?, ?, ?, ?, ?, ?)", [v4(), req.body.userName, req.body.email, req.body.phone, md5(req.body.password), req.body.address, 1])
                return res.status(200).json({signup: true, exist: false, verify_email: false, mess:"Đăng ký thành công, Vui lòng kiếm tra email để xác thực tài khoản."})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({signup: false, exist: false, verify_email: false, mess: "Đã xảy ra lỗi không xác định, vui lòng thử lại hoặc liên hệ admin"})
        }
    }),

    verifyEmail: asyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM user WHERE user_email= ?", [req.body.email])
            if(rows.length > 0) {
                return res.status(200).json({exist: true})
            }
            else {
                const verifyCode= randomIntFromInterval(100000, 999999)
                const [rows1]= await connection.execute("DELETE FROM verify_email WHERE email= ?", [req.body.email])
                const result= await verifyMail(req.body.email, verifyCode)
                const [rows2]= await connection.execute("INSERT INTO verify_email VALUES (?, ?)",[req.body.email, verifyCode])
                return res.status(200).json({exist: false})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({verify_email: false})
        }
    }),
} 

module.exports= signup