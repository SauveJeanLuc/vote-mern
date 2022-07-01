const express = require('express')
const app = express()

app.get('/hello', (req,res) => {
    res.send('hello world');
})

app.listen(3030, () => {
    console.log('Server Listening on Port 3030');
})