const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Song = require('../lib/models/Song');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('should create song', async() => {
    const res = await request(app)
      .post('/api/v1/songs')
      .send({ title: 'Sangria', artist: 'Blake Shelton', album: 'Bringing Back The Sunshine' });
     
    expect(res.body).toEqual({ id: expect.any(String), title: 'Sangria', artist: 'Blake Shelton', album: 'Bringing Back The Sunshine' });
  });

  it('should get all songs', async () => {
    await Song.insert({ title: 'Sangria', artist: 'Blake Shelton', album: 'Bringing Back The Sunshine' });
    const res = await request(app).get('/api/v1/songs');

    expect(res.body).toEqual([
      {  id: expect.any(String), title: 'Finish Line', artist: 'Elton John feat. Stevie Wonder', album: 'The Lockdown Sessions(Christmas Edition)' },
      {
        id: expect.any(String), title: 'Sangria', artist: 'Blake Shelton', album: 'Bringing Back The Sunshine'
      }
    ]);
  });

  it('should get song by id', async () => {
    const song = await Song.insert({ title: 'Sangria', artist: 'Blake Shelton', album: 'Bringing Back The Sunshine' });
    const res = await request(app).get(`/api/v1/songs/${song.id}`);
    expect(res.body).toEqual(song);
  });

  it('should update song based on id', async() => {
    const song = await Song.insert({ title: 'Sangria', artist: 'Blake Shelton', album: 'Bringing Back The Sunshine' });
    const res = await request(app)
      .patch(`/api/v1/songs/${song.id}`)
      .send({ title: 'A Girl', artist: 'Blake Shelton', album: 'Bringing Back The Sunshine' });

    const expected = {
      id: expect.any(String),
      title: 'A Girl', 
      artist: 'Blake Shelton', 
      album: 'Bringing Back The Sunshine' 
    };
    expect(res.body).toEqual(expected);
  });

  it('should delete song', async () => {
    const song = await Song.insert({ title: 'A Girl', artist: 'Blake Shelton', album: 'Bringing Back The Sunshine' });

    const res = await request(app)
      .delete(`/api/v1/songs/${song.id}`);

    expect(res.body).toEqual(song);
  });

});
