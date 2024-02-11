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
    const {rows: [album]} = await db.query('SELECT * FROM albums WHERE id=$1', [id])
    if (!album) {
      return res.status(404).json({message: `album ${id} does not exist`})
    }
    res.status(200).json(album)
  } catch(error){
    res.status(500).json(error)
  }
}

const updateAlbumById = async (req, res) => {
  try {
    const {name, year} = req.body
    const {id} = req.params
    const {rows: [album]} = await db.query('UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING *', [name, year, id])
    if (!album){
      return res.status(500).json({message: 'This album does not exist'})
    }
    res.status(200).json(album)
  } catch(error){
    res.status(500).json(error)
  }
}

const patchAlbumById = async (req, res) => {
  const {name, year} = req.body
  const {id} = req.params
  let query, params

  if (name&&year){
    query = 'UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING *'
    params = [name, year, id]
  }
  else if(!!year){
    query = 'UPDATE albums SET year=$1 WHERE id=$2 RETURNING *'
    params = [year, id]
  }
  else if(!!name){
    query = 'UPDATE albums SET name=$1 WHERE id=$2 RETURNING *'
    params = [name, id]
  }
  console.log(query + params)
  
  try {
    const {rows: [album]} = await db.query(query, params)
    if (!album){
      return res.status(500).json({message: 'This album does not exist'})
    }
    res.status(201).json(album)
  } catch(error){
    res.status(500).json(error)
  }
}

const deleteAlbumById = async (req, res) => {
  try{
    const {id} = req.params;
    
    const {rows:[album]} = await db.query('DELETE FROM albums WHERE id=$1 RETURNING *', [id])
    if (!album){
      return res.status(500).json({message: 'This album does not exist'})
    }
    res.status(200).json(album)
  }catch(error){
    res.status(500).json(error)
  }
  
}

module.exports = {createAlbum, getAlbumById, getAlbums, updateAlbumById, patchAlbumById, deleteAlbumById}