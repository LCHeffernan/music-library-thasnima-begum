const express = require('express');
const {postArtist, getArtists, getArtistById, updateArtistById, patchArtistById, deleteArtistById} = require('../controllers/artist')
const artistRouter = express.Router()

artistRouter.post('/artists', postArtist)

artistRouter.get('/artists', getArtists)

artistRouter.get('/artists/:id', getArtistById)

artistRouter.put('/artists/:id', updateArtistById)

artistRouter.patch('/artists/:id', patchArtistById)

artistRouter.delete('/artists/:id', deleteArtistById)

module.exports = artistRouter