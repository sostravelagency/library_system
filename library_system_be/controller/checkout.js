const expressAsyncHandler = require("express-async-handler");
const { v4 } = require("uuid");
const connection = require("../database/connect");

const checkout= expressAsyncHandler(async (req, res)=> {
    try {
        // Insert a new history record with the provided information
        const [rows]= await connection.execute("INSERT INTO history VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [v4(), req.body.user_id, req.body.book_in_book_id, new Date(), "0", 0, 0, 0, new Date()])
        // Remove the item from the user's cart
        const [rows1]= await connection.execute("DELETE FROM cart WHERE user_id= ? AND book_id= ?", [req.body.user_id, req.body.book_id])
        return res.status(200).json({add: true})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

module.exports= checkout