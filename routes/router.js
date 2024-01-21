const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

router.get('/canciones', (req, res) => {
  const canciones = JSON.parse(fs.readFileSync('./repertorio.json', 'utf-8'));
  res.send(canciones);
});

router.post('/canciones', (req, res) => {
  const cancion = req.body;
  if(!cancion.titulo && !cancion.artista && !cancion.tono) {
    return res.status(400).send('Se requiere a lo menos un campo');
  }
  const canciones = JSON.parse(fs.readFileSync('./repertorio.json', 'utf-8'));
  canciones.push(cancion);
  fs.writeFileSync('./repertorio.json', JSON.stringify(canciones));
  res.send('Canción agregada');
});

router.put('/canciones/:id', (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  if(!cancion.titulo && !cancion.artista && !cancion.tono) {
    return res.status(400).send('Se requiere a lo menos un campo');
  }
  const canciones = JSON.parse(fs.readFileSync('./repertorio.json', 'utf-8'));
  const index = canciones.findIndex((c) => c.id == id);
  canciones[index] = cancion;
  fs.writeFileSync('./repertorio.json', JSON.stringify(canciones));
  res.send('Canción actualizada');
});

router.delete('/canciones/:id', (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync('./repertorio.json', 'utf-8'));
  const index = canciones.findIndex((c) => c.id == id);
  canciones.splice(index, 1);
  fs.writeFileSync('./repertorio.json', JSON.stringify(canciones));
  res.send('Canción eliminada');
});

module.exports = router;
