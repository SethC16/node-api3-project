const express = require('express');

const router = express.Router();

const Users = require('./userDb');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
      .then( id => {
              res.status(201).json(id);
      })
      .catch( error => {
          console.log(error)
          res.status(500).json({
              message: "There was an error while saving the user to the database"
          })
      })
})

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  const postInfo = { text: req.body, user_id: req.params.id }
  Users.insert(postInfo)
      .then( post => {
              res.status(201).json(post);
      })
      .catch( error => {
          console.log(error);
              res.status(500).json({ message: "There was an error while saving the post to the database."})
      })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
  .then( user => {
      res.status(200).json(user);
  })
  .catch( error => {
      console.log(error)
      res.status(500).json({
          message: "Error retrieving the posts"
      })
  })
})


router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
        .then( post => {
            res.status(200).json(post);
        })
        .catch( error => {
            console.log(error)
            res.status(500).json({ error: "Error retrieving the user."})
        })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then( post => {
          res.status(200).json(post);
  })
  .catch( error => {
      console.log(error)
      res.status(500).json({ error: "The posts information could not be retrieved."})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then( user => {
          res.status(200).json(user);
  })
  .catch( error => {
      console.log(error);
      res.status(500).json({ error: "The user could not be removed."})

  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then( user => {
          res.status(200).json(user);
  })
  .catch( error => {
      console.log(error);
      res.status(500).json({ error: "The post information could not be modified."})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
    Users.getById(req.params.id)
    .then( user => {
        if (user) {
            req.user = user;
        } else {
            res.status(400).json({ message: "Invalid user id."})
        }
    })
  next()
}

function validateUser(req, res, next) {
  // do your magic!
    if (!req.body) {
        res.status(400).json({ message: "Missing user data."})
    } else if (req.body.name === "") {
        res.status(400).json({ message: "Missing required name field."})
    } else {
  next()
}
}

function validatePost(req, res, next) {
  // do your magic!
    if (!req.body) {
        res.status(400).json({ message: "Missing post data."})
    } else if (req.body.text === ""){
        res.status(400).json({ message: "Missing requried text field."})
    } else {
  next()
}
}

module.exports = router;
