const { expect } = require('chai')
const request = require('supertest')
const db = require('../src/db')
const app = require('../src/app')

describe('create album', () => {
  let artist;
  beforeEach( async ()=>{
    const {rows} = await db.query('INSERT INTO artists (name, genre) VALUES ($1, $2) RETURNING *', ['Taylor Swift', 'pop'])
    artist = rows[0]
  })

  describe('POST /artists/:id/albums', () => {
   it('creates a new album in the database', async () => {
        const id = artist.id
        const { status, body } = await request(app).post(`/artists/${id}/albums`).send({
          name: '1984',
          year: '2021',
        });

        expect(status).to.equal(201);
        expect(body.name).to.equal('1984');
        expect(body.year).to.equal(2021);

        const {
          rows: [albumData],
        } = await db.query(`SELECT * FROM albums WHERE id = ${body.id}`);
        expect(albumData.name).to.equal('1984');
        expect(albumData.year).to.equal(2021);
        expect(albumData.artistid).to.equal(id)
    });
  });
});

