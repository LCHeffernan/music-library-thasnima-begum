const express = require('express')
const {createAlbum, getAlbumById, getAlbums} = require('../controllers/album')
const albumRouter = express.Router()


albumRouter.post('/artists/:id/albums', createAlbum)

albumRouter.get('/albums', getAlbums)

albumRouter.get('/artists/:id/albums', getAlbumById)



module.exports = albumRouter