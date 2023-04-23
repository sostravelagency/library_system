const expressAsyncHandler = require("express-async-handler");
const connection = require("../../database/connect");

const get_notification= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM notification WHERE seen= 0")
        return res.status(200).json(rows)
        
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= get_notification