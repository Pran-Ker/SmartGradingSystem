// pages/api/ocr.js
import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { image } = req.body;

  const [result] = await client.documentTextDetection(image);
  const fullTextAnnotation = result.fullTextAnnotation;
  
  // return the OCR result
  res.status(200).json({ text: fullTextAnnotation.text });
}
