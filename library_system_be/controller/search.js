const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")
const Fuse= require("fuse.js")

const options = {
    // 検索に使用するキーの配列を定義する
    keys: [
      "book_name",
      "author_name"
    ]
  };
  
const search= expressAsyncHandler(async (req, res)=> {
    // book、category_book、category、およびauthorテーブルを横断する結合操作を実行する
    const [rows]= await connection.execute("SELECT * FROM category_book INNER JOIN book ON book.book_id = category_book.book_id INNER JOIN category ON category.category_id = category_book.category_id INNER JOIN author ON author.author_id = book.author_id")
    // オプションオブジェクトで定義された検索キーを使用して、新しいFuseインスタンスを作成する
    const fuse = new Fuse(rows, options);
    
    // リクエストで提供されたクエリパラメータを使用して検索を実行し、結果をJSONレスポンスとして返す
    return res.status(200).json(fuse.search(req.query.query))
})

module.exports= search
