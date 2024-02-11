const { expect } = require('chai')
const request = require('supertest')
const db = require('../src/db')
const app = require('../src/app')

describe('Delete Album', () => {
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

  describe('DELETE /albums/{id}', () => {
    it('deletes the artist and returns the deleted data', async () => {
      const { status, body } = await request(app).delete(`/albums/${album.id}`).send()

      expect(status).to.equal(200)

      expect(body).to.deep.equal({  id: album.id, name: '1984', year: 2021, artistid: artist.id })
    })

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app).delete('/artists/999999999').send()

      expect(status).to.equal(404)
      expect(body.message).to.equal('artist 999999999 does not exist')
    })
  })
})