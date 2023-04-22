const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const index= expressAsyncHandler(async(req, res)=> {
    try {
        // execute a MySQL query to get user information based on user ID passed in the request body
        const [rows]= await connection.execute("SELECT user_name, user_email, user_phone, user_address, role FROM user WHERE user_id= ?", [req.body.uid])
        if(rows.length >0 ) {
            // if user information is found, return it as a JSON response with a 200 status code and 'auth' key set to true
            return res.status(200).json({auth: true, ...rows[0]})
        }
        else {
            // if user information is not found, return a JSON response with a 200 status code and 'auth' key set to false
            return res.status(200).json({auth: false})
        }
    } catch (error) {
        // if an error occurs, return a JSON response with a 500 status code and 'auth' key set to false
        return res.status(200).json({auth: false})
    }
    
})

module.exports= index