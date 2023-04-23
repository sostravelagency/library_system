const expressAsyncHandler = require("express-async-handler");
const mime= require("mime")
const { v4 } = require("uuid")
const fs= require("fs")

// この関数は、base64イメージ文字列をデコードし、イメージタイプとデータを持つオブジェクトを返します
function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    // 入力文字列が有効かどうかを確認します
    if (matches.length !== 3) {
      return new Error('無効な入力文字列です');
    }
  
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
  
    return response;
}

// この関数は、base64文字列からイメージをアップロードします
const uploadImage= expressAsyncHandler(async (req, res)=> {
    const {image }= req.body

    try {
        // base64イメージ文字列をデコードする
        const decodedImg = decodeBase64Image(image);
        // デコードされたオブジェクトからイメージデータとタイプを取得する
        const imageBuffer = decodedImg.data;
        const type = decodedImg.type;
        // イメージタイプからファイル拡張子を取得する
        const extension = mime.getExtension(type);
        // UUID v4を使用してランダムなファイル名を生成する
        const fileName= v4()
        try{
            // 生成されたファイル名と拡張子を使用して、assets/iディレクトリにイメージデータをファイルに書き込む
            fs.writeFileSync("./assets/i/" + fileName + "."+ extension , imageBuffer, 'utf8');
            // アップロードされたイメージのURLを返す
            return res.status(200).json({img: "http://localhost:4000/i/" + fileName + "."+ extension})
        }
        catch(err){
            console.error(err)
            return res.status(200).json({img: false})
        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({img: false})
    }
})

module.exports= uploadImage
