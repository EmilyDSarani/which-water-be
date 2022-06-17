const pool = require('../utils/pool');

//we get this from the table
module.exports = class Song {
  id;
  title;
  artist;
  album;

  constructor(row){
    this.id = row.id;
    this.title = row.title;
    this.artist = row.artist;
    this.album = row.album;
  }

  static async insert({ title, artist, album }){
    const { rows } = await pool.query(
      'INSERT INTO songs(title, artist, album) VALUES ($1, $2, $3)RETURNING *', [title, artist, album]
    );
    return new Song(rows[0]);
  }
  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * FROM songs'
    );
    return rows.map((row) => new Song(row));
  }
  static async getById(id){
    const { rows } = await pool.query(
      'SELECT * FROM songs where id=$1', [id]
    );
    if(!rows[0]) return null;
    return new Song(rows[0]);
  }
  static async updateById(id, { title, artist, album }){
    const result = await pool.query(
      'SELECT * FROM songs WHERE id=$1', [id]);

    const existingSong = result.rows[0];

    if(!existingSong){
      const error = new Error(`Song ${id} not found`);
      error.status = 404;
      throw error;
    }
    //if there is no updated title, then just make it the existing song
    //  const title = updatedTitle ?? existingSong.title;
    //  const artist = updatedArtist ?? existingSong.artist;
    //  const album = updatedAlbum ?? existingSong.album;

    const { rows } = await pool.query(
      'UPDATE songs SET title=$2, artist=$3, album=$4 WHERE id=$1 RETURNING *', [id, title, artist, album]
    );
    return new Song(rows[0]);
   
  }
  static async deleteById(id){
    const { rows } = await pool.query(
      'DELETE FROM songs WHERE id=$1 RETURNING *', [id]
    );
    if(!rows[0]) return null;

    return new Song(rows[0]);
  }
};
