const connection = require("../database/connect")
const expressAsyncHandler= require('express-async-handler')
const verifyMail = require("../utils/mail")

// This function generates a random integer between two given values
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// This is an API endpoint for verifying a user's email account
const verify_account= expressAsyncHandler(async (req, res)=> {
    try {
        const {email}= req.body
        // Query the database for the user ID associated with the given email address
        const [rows]= await connection.execute("SELECT user_id FROM user WHERE user_email= ?", [email])
        // If there is no user with the given email address, return an error response
        if(rows.length <= 0) {
            return res.status(200).json({verify_account: false, exist: true})
        }
        // Otherwise, generate a verification code and insert it into the verify_email table in the database
        else {
            const verifyCode= randomIntFromInterval(100000, 999999)            
            const [rows]= await connection.execute("INSERT INTO verify_email VALUES (?, ?) ON DUPLICATE KEY UPDATE code= ?", [email, verifyCode, verifyCode])
            // Send an email to the user with the verification code
            const result= await verifyMail(email, verifyCode)
            return res.status(200).json({...result, verify: "pending"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
})

module.exports= verify_account