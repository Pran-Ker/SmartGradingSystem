const express = require('express');
const multer = require('multer');
const { createWorker } = require('tesseract.js');

const app = express();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('image');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.render('index', { message: err });
    }

    const worker = createWorker({
      logger: m => console.log(m)
    });

    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(`uploads/${req.file.filename}`);
      console.log(text);
      await worker.terminate();
      res.render('index', { message: 'Image uploaded and converted successfully!', text: text });
    })();
  });
});
