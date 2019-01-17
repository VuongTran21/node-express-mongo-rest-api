let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let app = express();
let port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log('Server listening on port ', port);
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-express-mongo-rest-api", { useNewUrlParser: true });

let nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
});

let User = mongoose.model("User", nameSchema);

app.post('/addname', (req, res) => {
    let myData = new User(req.body);

    myData.save()
        .then(item => {
            res.send("Item save to database")
        })
        .catch(err => {
            res.status(400).send('Unable to save to database');
        });
});