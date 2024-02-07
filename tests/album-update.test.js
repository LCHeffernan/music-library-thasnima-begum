const { expect } = require('chai')
const request = require('supertest')
const db = require('../src/db')
const app = require('../src/app')


describe('Update Album', () => {
  let album
  let artist
  beforeEach(async () => {
    const {rows} = await db.query('INSERT INTO artists (name, genre) VALUES( $1, $2) RETURNING *', [
      'Taylor Swift',
      'pop',
    ])
    artist = rows[0]

    const {rows: [albumData]} = await db.query('INSERT INTO albums (name, year, artistId) VALUES($1, $2, $3) RETURNING *', ['1984', '2021', artist.id])
    album = albumData
  })

  describe('PUT /albums/{id}', () => {
    it('replaces the album and returns the updated record', async () => {
      const { status, body } = await request(app).put(`/albums/${album.id}`).send({ name: 'something different', year: '2024' })
  
      expect(status).to.equal(200)
  
      expect(body).to.deep.equal({ artistid: artist.id, id: album.id, name: 'something different', year: 2024  })
    })
  })
})