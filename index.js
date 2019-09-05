//libraries
require('dotenv').config();
const express = require('express');
//other files
const PostRouter = require('./router.js')
//global objects
const server = express();
const port = process.env.PORT || 4000;
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
server.listen(port, () => {
    console.log(`\n*** Server Running on port ${port} ***\n`);
  });