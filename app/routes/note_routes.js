const express = require('express')
const passport = require('passport')
const Note = require('../models/note')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET /examples
router.get('/note', requireToken, (req, res, next) => {
  console.log('incoming request', req.user)
  Note.find({ owner: req.user._id })
    .then(note => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return note.map(note => note.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(note => res.status(200).json({ note: note }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/note/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Note.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(note => res.status(200).json({ note: note.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /examples
router.post('/note', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  req.body.note.owner = req.user.id

  Note.create(req.body.note)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(note => {
      res.status(201).json({ note: note.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/note/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.note.owner

  Note.findById(req.params.id)
    .then(handle404)
    .then(note => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, note)

      // pass the result of Mongoose's `.update` to the next `.then`
      return note.updateOne(req.body.note)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/note/:id', requireToken, (req, res, next) => {
  Note.findById(req.params.id)
    .then(handle404)
    .then(note => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, note)
      // delete the example ONLY IF the above didn't throw
      note.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// router.get('/show-all', (req, res, next) => {
//   Note.find()
//     .populate('owner')
//     .then(threads => res.status(201).json({ threads }))
//     .catch(next)
// })
module.exports = router
