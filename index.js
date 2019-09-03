//libraries
const express = require('express');
//other files
const db = require('./data/db.js')
//global objects
const server = express();
//middleware
server.use(express.json());

//req is request, res is response
//req is dealing with incoming, res is to deal with outgoing

//home

server.get('/', (req, res) => {
    res.send('Home');
})

//POSTS's
server.post('/api/posts', (req, res) => {
    const newPost = req.body;
    if (newPost.name && newPost.bio) {
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
    } else {
        res.status(400).json("Please provide title and contents for the post.")
    }
})

server.post('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    const newComment = req.body;
    if (newComment.text) {
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
    } else {
        res.status(400).json("Please provide text for the comment.")
    }
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
            message: 'The posts information could not be retrieved.'
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
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The post information could not be retrieved.'
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
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The comments information could not be retrieved.'
        })
    })
})

//DELETES's`
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(deletedPost => {
        if (deletedPost) {
            res.json(deletedPost);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The post with the specified ID does not exist.'
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
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The post information could not be modified.'
        })
    })
})

//server.listen always last
server.listen(4000, () => {
    console.log('server is running on port 4000...'); 
});