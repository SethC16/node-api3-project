const express = require('express');

const server = express();

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use(logger);
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)
server.use(express.json())

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;

  console.log(`[${new Date().toISOString()}] ${method} to ${endpoint}`)

  next()
}

module.exports = server;
