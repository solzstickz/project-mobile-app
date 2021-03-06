//backend

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    res.end("wellcome to root path")
});

app.get('/', (req, res) => {
    res.end("Wellcome home")
});


app.post('/api', (req, res) => {
    const feedback = req.body.constfeedback;
    res.end("Connect to api") + feedback;
});

//part 2 https://www.youtube.com/watch?v=qsJ858fiKIY 6.32//

app.listen(3000, () => {
    console.log("server node_express is running ..")
})