const express = require('express');
const {postArtist} = require('../controllers/artist')
const artistRouter = express.Router()

artistRouter.post('/artists', postArtist)

module.exports = artistRouter