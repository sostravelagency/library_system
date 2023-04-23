const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")
const {v4 }= require("uuid")

const author= {
    get: expressAsyncHandler(async(req, res)=> {
        const [rows]= await connection.execute("SELECT * FROM author")
        return res.status(200).json(rows)
    }),

    getById: expressAsyncHandler(async(req, res)=> {
        const [rows]= await connection.execute("SELECT * FROM author WHERE author.author_id = '"+req.query.id+"';")
        return res.status(200).json(rows[0])
    }),

    add: expressAsyncHandler(async(req, res)=> {
        try {    
                   
            // 新しい著者レコードを挿入するためにMySQLクエリを実行するために接続オブジェクトを使用する
            await connection.execute("INSERT INTO author VALUES(?, ?)", 
            [
                v4(), // uuidライブラリからv4関数を使用して新しい著者の一意のIDを生成する
                req.body.author_name, // リクエストボディから著者の名前を取得する
            ]);

            // 挿入操作が成功した場合、単一のプロパティ 'add' がtrueに設定されたJSONオブジェクトを持つ成功応答とステータス200を返す
            return res.status(200).json({add: true})

        } catch (error) {

            // エラーがある場合、ステータス500とエラーメッセージを持つサーバーエラー応答を返す
           return res.status(500).send(error) 
        }
    }),

    update: expressAsyncHandler(async(req, res)=> {
        try {
            await connection.execute("UPDATE author SET author_name= ? WHERE author.author_id =?", 
            [
                req.body.author_name,
                req.body.author_id
            ]);

            return res.status(200).json({update: true})
        } catch (error) {
           return res.status(500).send(error) 
        }
    }),
    delete: expressAsyncHandler(async (req, res)=> {
        try {
            await connection.execute("DELETE FROM author WHERE author_id= ?", [req.query.id]);

            return res.status(200).json({delete: true})
        } catch (error) {
           return res.status(500).send(error) 
        }
    }),
}

module.exports= author

