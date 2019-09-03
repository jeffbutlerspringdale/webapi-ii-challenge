//libraries
const express = require('express');
//other files
const PostRouter = require('./router.js')
const db = require('./data/db.js')
//global objects
const server = express();
//middleware
server.use(express.json());

server.use('/api/posts', PostRouter)
//req is request, res is response
//req is dealing with incoming, res is to deal with outgoing

//home

server.get('/', (req, res) => {
    res.send('Home');
})

//server.listen always last
server.listen(4000, () => {
    console.log('server is running on port 4000...'); 
});