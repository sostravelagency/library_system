const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const confirm_account= expressAsyncHandler(async (req, res)=> {
    try {
        // Checking if the email and code match a row in the verify_email table
        const [rows]= await connection.execute("SELECT * FROM verify_email WHERE email= ? AND code= ?", [req.body.email, req.body.code])

        // If a match is found, delete the row from the table and return a JSON response with the verify property set to true
        if(rows.length >0 ){ 
            const [rows]= await connection.execute("DELETE FROM verify_email WHERE email= ?", [req.body.email])
            return res.status(200).json({verify: true})
        }
        return res.status(200).json({verify: false})
        
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= confirm_account