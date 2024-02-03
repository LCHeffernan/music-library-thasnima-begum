const db = require('../db/index')

const createAlbum = async (req, res) => {
  try {
    const {name, year} = req.body
    const {id} = req.params
    const { rows: [album]} = await db.query('INSERT INTO albums(name, year, artistId) VALUES($1, $2, $3) RETURNING *', [name, year, id])
    res.status(201).json(album)
  } catch(error){
    res.status(500).json(error)
  }
}

const getAlbums = async (req, res) => {
  try {
    const {rows} = await db.query('SELECT * FROM albums')
    res.status(200).json(rows)
  }catch(error){
    res.status(500).json(error)
  }
}

const getAlbumById = async (req, res) => {
  try {
    const {id} = req.params
    const {rows} = await db.query('SELECT * FROM albums WHERE artistId=$1', [id])
    if (!rows) {
      return res.status(404).json({message: `The artist with Id ${artistId} has no albums`})
    }
    res.status(200).json(rows)
  } catch(error){
    res.status(500).json(error)
  }
}

module.exports = {createAlbum, getAlbumById, getAlbums}