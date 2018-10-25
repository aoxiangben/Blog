var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/ben',{useMongoClient:true});

var Schema = mongoose.Schema;

var UserSchema = new Schema({
        email:{
        type:String,
        require:true
          },
        nickname:{
        type:String,
        require:true
         },
         password:{
        type:String,
        require:true
        },
        create_time:{
        type:Date,
        default:Date.now
        },
         birthday:{
         type:Date
             }
    });

module.exports = mongoose.model('User',UserSchema);