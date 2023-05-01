// const express = require('express');
// const multer = require('multer');
// const { createWorker } = require('tesseract.js');

// const app = express();

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage }).single('image');

// // app.set('view engine', 'ejs');

// // app.get('/', (req, res) => {
// //   res.render('index');
// // });

// app.post('/upload', (req, res) => {
//   upload(req, res, err => {
//     if (err) {
//       return res.render('index', { message: err });
//     }

//     const worker = createWorker({
//       logger: m => console.log(m)
//     });

//     (async () => {
//       await worker.load();
//       await worker.loadLanguage('eng');
//       await worker.initialize('eng');
//       const { data: { text } } = await worker.recognize(`uploads/${req.file.filename}`);
//       console.log(text);
//       await worker.terminate();
//       res.render('index', { message: 'Image uploaded and converted successfully!', text: text });
//     })();
//   });
// });


// Import required modules
const express = require('express');
const multer = require('multer');
const vision = require('@google-cloud/vision');
const app = express();

// Configure Multer middleware to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Configure Google Cloud Vision API client
const client = new vision.ImageAnnotatorClient();

// Define a route for file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const [result] = await client.textDetection(req.file.path);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));
    res.status(200).send(detections);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
