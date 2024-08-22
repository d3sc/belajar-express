import db from "../koneksi.js";

// http://localhost:3000/
export const getMahasiswa = (req, res) => {
  // select semua data dari table mahasiswa
  const sql = "SELECT * FROM mahasiswa";
  // mengirim query ke databse mysql
  db.query(sql, (error, result) => {
    // mengirim data ke client browser
    res.send(result);
  });
};

// http://localhost:3000/find?nim=1001
export const getMahasiswaByNim = (req, res) => {
  // menangkap data query url
  const nim = req.query.nim;
  // menangkap semua data dari table mahasiswa berdasarkan nim
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
  // mengirim query ke databse mysql
  db.query(sql, (error, result) => {
    // mengirim data hasil ke client browser
    res.json(result);
  });
};

export const createMahasiswa = (req, res) => {
  // menangkap body dari response yang dikirim oleh thunderclient
  const { nim, nama_lengkap, kelas, alamat } = req.body;
  // insert ke mahasiswa dengan nilai nim, nama_lengkap, kelas, alamat dari body
  const sql =
    "INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (?,?,?,?)";
  db.query(sql, [nim, nama_lengkap, kelas, alamat], (error, result) => {
    // jika terdapat error
    if (error) {
      res.status(400);
      res.send(error);
    }
    // jika tidak ada error
    res.status(201);
    res.json(result);
  });
};

export const updateMahasiswa = (req, res) => {
  // nim, query nim
  const nim = req.query.nim;

  //   menangkap req body
  const { nama_lengkap, kelas, alamat } = req.body;
  //   mengecek nim, nama
  if (nim || nama_lengkap || kelas || alamat) {
    // query Update table mahasiswa
    const query = `UPDATE mahasiswa SET nama_lengkap = "${nama_lengkap}", kelas = "${kelas}", alamat= "${alamat}" WHERE nim = ${nim}`;

    // mengirim query ke database
    db.query(query, (error, result) => {
      if (error) res.status(400).send(error.message);

      res.json(result);
    });
  } else {
    res.send("isi body nya");
  }
};

export const deleteMahasiswa = (req, res) => {
  const nim = req.query.nim;
  const sql = "DELETE FROM mahasiswa WHERE nim = ?";
  db.query(sql, [nim], (error, result) => {
    if (error) {
      res.status(400);
      res.send(error);
    }
    res.status(200);
    res.json("data berhasil dihapus");
  });
};
