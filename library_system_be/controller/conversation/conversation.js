const expressAsyncHandler = require("express-async-handler")
const { v4 } = require("uuid")
const connection = require("../../database/connect")

const conversation= {
    get: expressAsyncHandler(async (req, res)=> {
        try {

            // すべてのユーザーIDを持つ会話を選択します
            const [rows1]= await connection.execute("SELECT * FROM conversation WHERE conversation.user_id =? ", [req.query.user_id])

            // 会話が存在する場合
            if(rows1.length > 0) {

                // ユーザーIDを持つ会話のすべてのメッセージを選択します
                const [rows] =await connection.execute("SELECT * FROM message INNER JOIN user ON user.user_id = message.sender_id WHERE message.conversation_id= ?", [rows1[0].conversation_id])
                // 会話とそのメッセージを返します
                return res.status(200).json({conversation: rows1[0].conversation_id, message: rows})
            }
            else {

                // 新しい会話IDを作成します
                const conversation_id= v4()
                // 新しいIDとユーザーIDを持つ新しい会話を挿入します
                const [row1]= await connection.execute("INSERT INTO conversation VALUES (?, ?)", [conversation_id, req.query.user_id])
                // 新しい会話とそのメッセージを返します
                const [rows]= await connection.execute("SELECT * FROM message INNER JOIN user ON user.user_id = message.sender_id WHERE message.conversation_id= ?", [conversation_id])
                return res.status(200).json({conversation: conversation_id, message: rows})
            }
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),

    // ユーザー情報を持つすべての会話を取得する関数を定義します
    getAll: expressAsyncHandler(async (req, res)=> {
        try {
            // ユーザー情報を持つすべての会話を選択します
            const [rows]= await connection.execute("SELECT * FROM conversation INNER JOIN user ON conversation.user_id = user.user_id")
            // ユーザー情報を持つすべての会話を返します
            return res.status(200).json(rows)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    })
}

module.exports= conversation
