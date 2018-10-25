var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/ben',{useMongoClient:true});

var Schema = mongoose.Schema;

var ContentSchema = new Schema({
    title:String,
    author: String,
    create_time:Date.now,
    type:String,
    content:String
});
module.exports = mongoose.model('Content',ContentSchema);