const db = require('../db/index')

const postArtist = async (req, res) => {
  try {
    const {name, genre} = req.body
    const { rows: [artist] } = await db.query("INSERT INTO artists(name, genre) VALUES($1, $2) RETURNING *", [name, genre])
    res.status(201).json(artist)
  }
  catch(error) {
    res.sendStatus(500).json(error)
  }
}

const getArtists = async (_, res)=>{
  try{
    const { rows } = await db.query("SELECT * FROM artists")
    res.status(200).json(rows)
  }
  catch(error){
    res.status(500).json(error)
  }
}

const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows: [artist] } = await db.query("SELECT * FROM artists WHERE id = $1", [id]) 
    
    if (!artist) {
      return res.status(404).json({message: `artist ${id} does not exist`})
    }

    res.status(200).json(artist)
  } catch (error){
    res.status(500).json(error.message)
  }
}

const updateArtistById = async (req, res) => {
  try {
    const {name, genre} = req.body
    const { id } = req.params;
    const {rows: [artist]} = await db.query("UPDATE artists SET name = $1, genre=$2 WHERE id = $3 RETURNING *", [name, genre, id])

    if (!artist) {
      return res.status(404).json({message: `artist ${id} does not exist`})
    }

    res.status(200).json(artist)
  } catch(error){
    res.status(500).json(error)
  }
}

const patchArtistById = async (req, res) => {
    const {name, genre} = req.body
    const {id} = req.params
    let query, params
    if(name && genre){
      query = "UPDATE artists SET name=$1, genre=$2 WHERE id=$3 RETURNING *"
      params = [name, genre, id]
    }
    else if (name){
      query = "UPDATE artists SET name=$1 WHERE id=$2 RETURNING *"
      params = [name, id]
    }
    else if (genre){
      query = "UPDATE artists SET genre=$1 WHERE id=$2 RETURNING *"
      params = [genre, id]
    }

try {
    const {rows: [artist]} = await db.query(query, params)
    if (!artist) {
      return res.status(404).json({message: `artist ${id} does not exist`})
    }
    res.status(200).json(artist)

  } catch(error){
    res.status(500).json(error)
  }
}

const deleteArtistById = async (req, res) => {
  try {
    const {id} = req.params
    const {rows:[artist]} = await db.query("DELETE FROM artists WHERE id=$1 RETURNING *", [id])

    if (!artist) {
      return res.status(404).json({message: `artist ${id} does not exist`})
    }

    res.status(200).json(artist)

  } catch(error) {
    res.status(500).json(error)
  }
}



module.exports = {postArtist, getArtists, getArtistById, updateArtistById, patchArtistById, deleteArtistById}