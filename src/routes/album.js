const express = require('express')
const {createAlbum, getAlbums, getAlbumById, updateAlbumById, patchAlbumById, deleteAlbumById} = require('../controllers/album')
const albumRouter = express.Router()


albumRouter.post('/artists/:id/albums', createAlbum)

albumRouter.get('/albums', getAlbums)

albumRouter.get('/albums/:id', getAlbumById)

albumRouter.put('/albums/:id', updateAlbumById)

albumRouter.patch('/albums/:id', patchAlbumById)

albumRouter.delete('/albums/:id', deleteAlbumById)



module.exports = albumRouter