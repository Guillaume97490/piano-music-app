const express = require('express');
      // path = require('path'),
      // morgan = require('morgan'),
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const app = express();
const mongoose=require('mongoose');
var mongoDB = 'mongodb://localhost:27017/music';
var ObjectId=mongoose.Types.ObjectId;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
var   Schema = mongoose.Schema;
var soundsSchema=Schema({ 
    id:{type:ObjectId},
    nom:String
 })
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({extended: true}));
var Sounds = mongoose.model('sounds', soundsSchema);
// importing routes
//const livreRoutes = require('./route/router');

// settings
app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public/sounds', express.static(__dirname + '/public/sounds'));
app.use('/public', express.static(__dirname + '/public'));
// routes
//app.use('/', livreRoutes);
app.use(fileUpload());
// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });

app.get("/", (req,res) => {

    Sounds.find({},(err,sons)=>{ 
    //    console.log(sons)
    res.render("index",{sounds:sons,i:1});
});

});
app.post("/update", (req,res) => {
    slot = Number(req.body.slot);
    file = req.files.file1;  
    path = "public/sounds/" + file.name;
    console.log(slot);
    file.mv(path,()=>{

         Sounds.find({}).limit(1).skip(slot - 1).exec((err,son)=> {
            // console.log(file.name)
            console.log(son[0]._id)
            // Sounds.update({_id:son[0]._id},{$set:{ nom:file.name } } );
           Sounds.findByIdAndUpdate(son[0]._id,{nom:file.name}, ()=>{
               res.redirect("/");
           });
         });  
    });
})