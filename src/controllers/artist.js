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

module.exports = {postArtist}