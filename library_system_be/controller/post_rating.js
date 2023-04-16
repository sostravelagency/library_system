const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");
const { v4 } = require("uuid");

const post_rating= expressAsyncHandler(async (req, res)=> {
    try {
        console.log(req.body)
        // eslint-disable-next-line
        const [rows1]= await connection.execute("SELECT book_id FROM book_in_book WHERE book_in_book_id= ? LIMIT 1", [req.body.book_id])
        const [rows]= await connection.execute("INSERT INTO rating(rating_id, score, book_id, user_id) VALUES(?, ?, ?, ?)", [v4(), req.body.score, rows1[0]?.book_id, req.body.user_id])
        return res.status(200).json({add: true})
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= post_rating