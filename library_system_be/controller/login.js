const connection = require("../database/connect")
const asyncHandler = require('express-async-handler')
// const {v4}= require("uuid")
const md5 = require("md5")
const { jwtInit } = require("../middleware/jwt")

const login= asyncHandler(async (req, res)=> {
    try {
        // Check if user email and password are valid
        const [rows]= await connection.execute("SELECT user_id, role FROM user WHERE user_email= ? AND user_password=? ", [req.body.account, md5(req.body.password)])
        if(rows.length > 0) {
            // If user is admin
            if(parseInt(rows[0]?.role)=== 3) {
                 // Create an access token with isAdmin claim
                const accessToken= jwtInit({...rows[0], isAdmin: true})
                return res.status(200).json({login: true, exist: true, ...rows[0], isAdmin: true, accessToken})
            }
            // If user is staff
            if(parseInt(rows[0]?.role)=== 2) {
                // Create an access token with isStaff claim
                const accessToken= jwtInit({...rows[0], isStaff: true})
                return res.status(200).json({login: true, exist: true, ...rows[0], isStaff: true, accessToken})
            }
            // Create a normal access token
            const accessToken= jwtInit({...rows[0]})
            return res.status(200).json({login: true, exist: true, ...rows[0], accessToken})
            
        }
        else {
           // If email and password are not valid
            return res.status(200).json({login: false, exist: false})
        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({login: false})
    }
})


module.exports= login