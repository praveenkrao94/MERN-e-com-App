const express = require('express');

const app = express();

const cors = require('cors')

app.use(cors());

const port = process.env.PORT || 4000

const http = require('http')

const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.get('/test', (req, res) => {
    res.json("test ok")
})



server.listen(port, () => {
    console.log(`listening on ${port}`)
})