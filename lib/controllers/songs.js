const { Router } = require('express');
const Song = require('../models/Song');


module.exports = Router()
  .post('/', async (req, res) => {
    const song = await Song.insert({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album
    });
    res.send(song);
  })

  .get('/', async (req, res) => {
    const songs = await Song.getAll();
    res.send(songs);
  })

  .get('/:id', async (req, res) => {
    
    const { id } = req.params;

    const song = await Song.getById(id);
    res.send(song);

  })
  //we use a try-catch because it is not on a local sphere, but on a global sphere and this will catch issues better...
  //note for future- could probably put all CRUD in try-catches
  .patch('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      // const { title, artist, album } = req.body;
  
      const song = await Song.updateById(id, { ...req.body });

      res.send(song);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const song = await Song.deleteById(id);
    res.send(song);
  });

