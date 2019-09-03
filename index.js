//libraries
const express = require('express');
//other files
const db = require('./data/db.js')
//global objects
const server = express();
//middleware
server.use(express.json());

//home
server.get('/', (req, res) => {
    //req is request, res is response
    //req is dealing with incoming, res is to deal with outgoing
    res.send('Home');
})

//POSTS's
server.post('/api/posts', (req, res) => {
    const newPost = req.body;
    db.insert(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to create new post'
            })
        })
})

server.post('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    const newComment = req.body;

    db.insert(id, newComment)
        .then(newComment => {
            res.status(201).json(newComment)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to create new comment'
            })
        })
})

//GETS's
server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failed to get posts'
        })
    })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(postByID => {
        if (postByID) {
            res.json(postByID)
        } else {
            res.status(404).json({
                message: 'invalid post ID'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failed to get post by ID'
        })
    })
})

server.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    db.commentByID(id)
    .then(commentByID => {
        if (commentByID) {
            res.json(commentByID)
        } else {
            res.status(404).json({
                message: 'invalid comment ID'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failed to get comment by ID'
        })
    })
})

//DELETES's
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(deletedPost => {
        if (deletedPost) {
            res.json(deletedPost);
        } else {
            res.status(404).json({
                message: 'invalid post ID'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failed to remove post'
        })
    })
})

//PUT'S
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    db.update(id, changes)
    .then(updated => {
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).json({
                message: 'invalid post ID'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failed to update post'
        })
    })
})

//server.listen always last
server.listen(4000, () => {
    console.log('server is running on port 4000...'); 
});