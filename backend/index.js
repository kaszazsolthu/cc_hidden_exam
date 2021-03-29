const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3023;

const cors = require('cors');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.send('<p>Server is OK!</p>');
});

app.get('/data', (req, res) => {
    data = JSON.parse(fs.readFileSync('data.json'));
    res.send(data);
});

app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
});
