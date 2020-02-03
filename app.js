const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const app = express();
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/music';
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
var Schema = mongoose.Schema;
var soundsSchema = Schema({
    id: { type: ObjectId },
    nom: String
});
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
var Sounds = mongoose.model('sounds', soundsSchema);

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use('/public/sounds', express.static(__dirname + '/public/sounds'));
app.use('/public', express.static(__dirname + '/public'));
// routes
app.use(fileUpload());



// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});



app.get("/", (req, res) => {

    Sounds.find({}, (err, sons) => {
        res.render("index", { sounds: sons, i: 1 });
    });

});
app.post("/update", (req, res) => {
    slot = Number(req.body.slot);
    file = req.files.file1;
    path = "public/sounds/" + file.name;
    console.log(slot);
    file.mv(path, () => {

        Sounds.find({}).limit(1).skip(slot - 1).exec((err, son) => {
            console.log(son[0]._id)
            Sounds.findByIdAndUpdate(son[0]._id, { nom: file.name }, () => {
                res.redirect("/");
            });
        });
    });
})