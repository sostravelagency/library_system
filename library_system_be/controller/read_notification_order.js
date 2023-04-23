const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const read_notification_order= expressAsyncHandler(async (req, res)=> {
    const [rows]= await connection.execute("UPDATE notification SET seen= 1 WHERE type= 0")
    return res.status(200).send("")
})

module.exports= read_notification_order