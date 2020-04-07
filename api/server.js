const express = require('express');
const cors = require('cors');

const postsRouter = require('../posts/router');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.setHeader({
        ...res.header,
        ContentType : 'text/html'
    })
    res.send(`
        <h2>Blogs</h>
    `);
});


module.exports = server;